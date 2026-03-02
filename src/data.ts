export const projectData = {
  name: "contain-pilot",
  language: "Rust",
  type: "CLI Tool",
  description: "A high-performance CLI utility that orchestrates local Large Language Models (LLMs) via Docker containers to provide a privacy-focused, offline-capable AI coding assistant. It acts as a local proxy and manager, spinning up optimized inference containers (like Ollama or vLLM) on-demand and exposing an OpenAI-compatible API for editor integration, as well as an interactive terminal UI for direct context-aware querying.",
  keyFeatures: [
    "Automated Docker Lifecycle Management: Automatically pulls, starts, stops, and manages health checks for LLM inference containers.",
    "Model Agnostic Backend: Supports switching between various containerized inference engines (Ollama, TGI, LocalAI) via configuration.",
    "Interactive TUI: A rich terminal user interface using Ratatui for chat-based code assistance and system monitoring.",
    "OpenAI-Compatible Proxy: Exposes a local REST API endpoint that mimics OpenAI's signature, allowing integration with existing IDE plugins (VS Code, Neovim) simply by changing the base URL.",
    "Context Awareness: capability to pipe file contents or git diffs into the context window via stdin.",
    "Resource Guardrails: Configurable CPU/GPU and RAM limits to prevent the background container from starving the host system."
  ],
  performanceRequirements: "The CLI itself must have a memory footprint under 20MB. Container orchestration commands must be asynchronous and non-blocking. The proxy layer should add less than 5ms latency to requests forwarded to the inference engine. Startup time for the CLI tool should be instant (<100ms), providing immediate feedback while the heavier Docker container spins up in the background.",
  testingStrategy: "Unit tests for core logic (configuration parsing, string manipulation). Integration tests using `testcontainers` to verify Docker interactions without polluting the host system. End-to-end tests mocking the OpenAI API to verify the proxy layer handles requests and responses correctly. CI pipeline running `clippy` and `cargo audit` for security compliance.",
  deploymentPlan: "Distribute via `cargo install` (crates.io). Provide pre-compiled binaries for Linux (gnu/musl), macOS (Silicon/Intel), and Windows via GitHub Releases. A 'setup' command will act as a bootstrapping script to verify Docker installation and pull default lightweight coding models.",
  recommendedLibraries: [
    "clap (v4) - Command Line Argument Parsing",
    "bollard - Asynchronous Docker API client for Rust",
    "tokio - Asynchronous runtime for handling I/O and container signals",
    "ratatui - Terminal User Interface for interactive mode",
    "reqwest - HTTP client for communicating with the inference container",
    "axum - For hosting the local OpenAI-compatible API server",
    "serde/serde_json - Serialization and deserialization",
    "tracing - Structured logging"
  ],
  architectureOverview: "The application follows a Hexagonal Architecture (Ports and Adapters). The core domain logic handles the 'Session' and 'Context'. Adapters exist for the CLI (interactive input), the Docker Daemon (via Bollard), and the API Server (via Axum). The main thread runs a Tokio runtime. When started, the tool checks for the existence of the specific LLM Docker container; if missing, it pulls it. If stopped, it starts it. The application then either enters an interactive TUI loop or starts a background HTTP server to listen for IDE requests, forwarding them to the containerized model.",
  folderStructure: `contain-pilot/
├── Cargo.toml
├── README.md
├── src/
│   ├── main.rs                 # Application entry point
│   ├── lib.rs                  # Library definition for testing
│   ├── cli/                    # CLI Interface layer
│   │   ├── mod.rs
│   │   ├── args.rs             # Clap definition
│   │   ├── tui.rs              # Ratatui implementation
│   │   └── spinner.rs          # UI feedback
│   ├── config/                 # Configuration handling
│   │   ├── mod.rs
│   │   └── settings.rs         # TOML/Env config loading
│   ├── engine/                 # Docker Orchestration
│   │   ├── mod.rs
│   │   ├── docker_client.rs    # Bollard wrapper
│   │   └── models.rs           # Supported model definitions
│   ├── server/                 # Local API Server
│   │   ├── mod.rs
│   │   ├── routes.rs
│   │   └── proxy.rs            # Request forwarding logic
│   └── utils/                  # Shared utilities
│       ├── mod.rs
│       └── error.rs            # Custom error types
└── tests/                      # Integration tests
    ├── docker_integration.rs
    └── api_integration.rs`,
  codeSnippets: [
    {
      title: "CLI Argument Definition (Clap)",
      language: "rust",
      code: `use clap::{Parser, Subcommand};

#[derive(Parser)]
#[command(author, version, about = "Orchestrate local AI coding assistants via Docker")]
pub struct Cli {
    #[command(subcommand)]
    pub command: Commands,

    /// Path to configuration file
    #[arg(short, long, value_name = "FILE")]
    pub config: Option<String>,
}

#[derive(Subcommand)]
pub enum Commands {
    /// Start the daemon and API server
    Serve {
        #[arg(long, default_value = "8080")]
        port: u16,
    },
    /// Start an interactive chat session in the terminal
    Chat {
        /// The model tag to use (e.g., codellama:7b)
        #[arg(short, long, default_value = "codellama:latest")]
        model: String,
    },
    /// Manage the background container
    Container {
        #[arg(long)]
        stop: bool,
        #[arg(long)]
        restart: bool,
    },
}`,
      description: "Defines the command-line interface using `clap`'s derive macros. It separates concerns into Serve (API mode), Chat (Interactive mode), and Container management."
    },
    {
      title: "Docker Container Management (Bollard)",
      language: "rust",
      code: `use bollard::Docker;
use bollard::container::{Config, CreateContainerOptions, StartContainerOptions};
use crate::utils::error::AppError;

pub struct ContainerManager {
    docker: Docker,
}

impl ContainerManager {
    pub async fn new() -> Result<Self, AppError> {
        let docker = Docker::connect_with_local_defaults()
            .map_err(|e| AppError::DockerConnection(e.to_string()))?;
        Ok(Self { docker })
    }

    pub async fn ensure_running(&self, image: &str, container_name: &str) -> Result<(), AppError> {
        // Check if container exists
        match self.docker.inspect_container(container_name, None).await {
            Ok(_) => {
                // Container exists, ensure it is started
                self.docker.start_container(container_name, None::<StartContainerOptions<String>>)
                    .await
                    .map_err(|e| AppError::ContainerStart(e.to_string()))?;
            }
            Err(bollard::errors::Error::DockerResponseServerError { status_code: 404, .. }) => {
                // Create and start
                let config = Config {
                    image: Some(image),
                    cmd: Some(vec!["serve"]), // Specific to the LLM image
                    ..Default::default()
                };
                
                self.docker.create_container(
                    Some(CreateContainerOptions { name: container_name, ..Default::default() }),
                    config,
                ).await.map_err(|e| AppError::ContainerCreation(e.to_string()))?;

                self.docker.start_container(container_name, None::<StartContainerOptions<String>>)
                    .await.map_err(|e| AppError::ContainerStart(e.to_string()))?;
            }
            Err(e) => return Err(AppError::DockerInternal(e.to_string())),
        }
        Ok(())
    }
}`,
      description: "Uses the `bollard` library to asynchronously interact with the local Docker daemon. It checks for the existence of a container and either starts it or creates and starts it if it's missing, demonstrating robust resource management."
    },
    {
      title: "API Proxy Logic (Axum)",
      language: "rust",
      code: `use axum::{Json, extract::State};
use serde_json::{Value, json};
use crate::config::Settings;

// Acts as a middleware/proxy to the containerized LLM
pub async fn chat_completions(
    State(settings): State<Settings>,
    Json(payload): Json<Value>,
) -> Json<Value> {
    let client = reqwest::Client::new();
    
    // Construct the URL to the internal Docker container
    let container_url = format!("{}/v1/chat/completions", settings.container_endpoint);

    // Forward the request
    match client.post(&container_url).json(&payload).send().await {
        Ok(resp) => {
            if let Ok(json_body) = resp.json::<Value>().await {
                Json(json_body)
            } else {
                Json(json!({ "error": "Invalid response from model container" }))
            }
        }
        Err(e) => {
            tracing::error!("Failed to contact container: {}", e);
            Json(json!({ "error": "Model container unavailable", "details": e.to_string() }))
        }
    }
}`,
      description: "An Axum handler that mimics an OpenAI endpoint. It accepts a standard JSON payload, forwards it to the locally running Docker container (configured via settings), and relays the response back to the client (e.g., VS Code)."
    }
  ]
};
