import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { projectData } from "../data";
import { Copy, Check } from "lucide-react";

export default function CodeSnippets() {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(projectData.codeSnippets[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="code" className="bg-zinc-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-orange-400">
            Implementation
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Core Implementation Snippets
          </p>
        </div>

        <div className="mt-16 sm:mt-20 lg:mt-24">
          <div className="flex flex-wrap justify-center gap-2 border-b border-white/10 pb-4">
            {projectData.codeSnippets.map((snippet, index) => (
              <button
                key={snippet.title}
                onClick={() => setActiveTab(index)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === index
                    ? "bg-orange-500/10 text-orange-400 ring-1 ring-orange-500/50"
                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {snippet.title}
              </button>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-zinc-950 p-4 ring-1 ring-white/10 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm text-zinc-400">
                    {projectData.codeSnippets[activeTab].description}
                  </p>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 rounded-md bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <div className="overflow-x-auto rounded-xl bg-zinc-900/50 p-4 ring-1 ring-inset ring-white/5">
                  <pre className="text-sm text-zinc-300">
                    <code>{projectData.codeSnippets[activeTab].code}</code>
                  </pre>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
