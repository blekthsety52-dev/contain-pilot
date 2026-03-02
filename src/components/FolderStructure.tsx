import { motion } from "motion/react";
import { projectData } from "../data";
import { FolderTree } from "lucide-react";

export default function FolderStructure() {
  return (
    <section id="structure" className="bg-zinc-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-orange-400">
            Organization
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Folder Structure
          </p>
          <p className="mt-6 text-lg leading-8 text-zinc-400">
            A clean, maintainable hexagonal architecture layout.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden rounded-2xl bg-zinc-900 ring-1 ring-white/10"
          >
            <div className="flex items-center gap-2 border-b border-white/10 bg-zinc-950 px-6 py-4">
              <FolderTree className="h-5 w-5 text-orange-400" />
              <h3 className="text-sm font-medium text-white">Project Layout</h3>
            </div>
            <div className="p-6 sm:p-8">
              <pre className="overflow-x-auto text-sm leading-6 text-zinc-300">
                <code>{projectData.folderStructure}</code>
              </pre>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
