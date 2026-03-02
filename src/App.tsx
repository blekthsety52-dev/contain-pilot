/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Architecture from "./components/Architecture";
import CodeSnippets from "./components/CodeSnippets";
import FolderStructure from "./components/FolderStructure";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 selection:bg-orange-500/30">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Architecture />
        <CodeSnippets />
        <FolderStructure />
      </main>
      <Footer />
    </div>
  );
}
