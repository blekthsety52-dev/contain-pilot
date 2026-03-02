import { motion } from "motion/react";
import { projectData } from "../data";
import {
  Server,
  Layers,
  TerminalSquare,
  Network,
  FileCode2,
  Cpu,
} from "lucide-react";

const iconMap = [
  <Server className="h-6 w-6 text-orange-400" />,
  <Layers className="h-6 w-6 text-orange-400" />,
  <TerminalSquare className="h-6 w-6 text-orange-400" />,
  <Network className="h-6 w-6 text-orange-400" />,
  <FileCode2 className="h-6 w-6 text-orange-400" />,
  <Cpu className="h-6 w-6 text-orange-400" />,
];

export default function Features() {
  return (
    <section id="features" className="bg-zinc-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-orange-400">
            Deploy Faster
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Everything you need to run local AI
          </p>
          <p className="mt-6 text-lg leading-8 text-zinc-400">
            contain-pilot provides a comprehensive suite of tools to manage,
            orchestrate, and interact with local LLMs seamlessly.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {projectData.keyFeatures.map((feature, index) => {
              const [title, description] = feature.split(": ");
              return (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col rounded-2xl bg-zinc-950 p-8 ring-1 ring-white/10 transition-shadow hover:ring-orange-500/50"
                >
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
                      {iconMap[index % iconMap.length]}
                    </div>
                    {title}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-zinc-400">
                    <p className="flex-auto">{description}</p>
                  </dd>
                </motion.div>
              );
            })}
          </dl>
        </div>
      </div>
    </section>
  );
}
