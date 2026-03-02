import { motion } from "motion/react";
import { projectData } from "../data";
import { Zap, ShieldCheck, Rocket, PackageSearch } from "lucide-react";

export default function Architecture() {
  return (
    <section id="architecture" className="bg-zinc-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-orange-400">
            Built for Speed
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Hexagonal Architecture
          </p>
          <p className="mt-6 text-lg leading-8 text-zinc-400">
            {projectData.architectureOverview}
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col rounded-2xl bg-zinc-900 p-8 ring-1 ring-white/10"
            >
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
                  <Zap className="h-6 w-6 text-orange-400" />
                </div>
                Performance Strategy
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-zinc-400">
                <p className="flex-auto">{projectData.performanceRequirements}</p>
              </dd>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col rounded-2xl bg-zinc-900 p-8 ring-1 ring-white/10"
            >
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
                  <ShieldCheck className="h-6 w-6 text-orange-400" />
                </div>
                Testing Strategy
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-zinc-400">
                <p className="flex-auto">{projectData.testingStrategy}</p>
              </dd>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col rounded-2xl bg-zinc-900 p-8 ring-1 ring-white/10"
            >
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
                  <Rocket className="h-6 w-6 text-orange-400" />
                </div>
                Deployment Plan
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-zinc-400">
                <p className="flex-auto">{projectData.deploymentPlan}</p>
              </dd>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col rounded-2xl bg-zinc-900 p-8 ring-1 ring-white/10"
            >
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
                  <PackageSearch className="h-6 w-6 text-orange-400" />
                </div>
                Recommended Libraries
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-zinc-400">
                <ul className="list-inside list-disc space-y-2">
                  {projectData.recommendedLibraries.map((lib, i) => (
                    <li key={i} className="text-sm">
                      {lib}
                    </li>
                  ))}
                </ul>
              </dd>
            </motion.div>
          </dl>
        </div>
      </div>
    </section>
  );
}
