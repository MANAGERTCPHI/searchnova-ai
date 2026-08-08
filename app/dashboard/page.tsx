import Link from "next/link";
import { ArrowUpRight, BarChart3, FolderKanban, Search, Sparkles } from "lucide-react";

const stats = [
  ["Researches", "0", "Start your first project"],
  ["Keywords saved", "0", "Build your library"],
  ["Projects", "0", "Organize your research"],
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <header className="border-b border-white/10 bg-slate-950/70">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link href="/" className="flex items-center gap-2 font-semibold"><span className="grid size-8 place-items-center rounded-lg bg-violet-600"><Sparkles className="size-4" /></span>SearchNova <span className="text-violet-400">AI</span></Link>
          <Link href="/" className="text-sm text-slate-400 hover:text-white">Back to site</Link>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-sm text-violet-300">Workspace</p><h1 className="mt-1 text-3xl font-bold tracking-tight">SEO Research Dashboard</h1><p className="mt-2 text-slate-400">Your command center for keyword discovery and content intelligence.</p></div><button className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold hover:bg-violet-500"><Search className="size-4" /> New research</button></div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">{stats.map(([label, value, hint]) => <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"><p className="text-sm text-slate-400">{label}</p><p className="mt-2 text-3xl font-bold">{value}</p><p className="mt-1 text-xs text-slate-500">{hint}</p></div>)}</div>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"><div className="flex items-center justify-between"><div><h2 className="font-semibold">Start a keyword research</h2><p className="mt-1 text-sm text-slate-400">Enter a topic to generate your first research set.</p></div><BarChart3 className="size-5 text-violet-300" /></div><div className="mt-6 flex flex-col gap-3 sm:flex-row"><input className="min-w-0 flex-1 rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm outline-none placeholder:text-slate-600 focus:border-violet-500" placeholder="e.g. productivity apps for teams" /><button className="rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold">Analyze</button></div></section>
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"><div className="flex items-center gap-3"><FolderKanban className="size-5 text-cyan-300" /><h2 className="font-semibold">Recent projects</h2></div><div className="mt-8 text-center"><p className="text-sm text-slate-400">No projects yet.</p><Link href="#" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-violet-300">Create one <ArrowUpRight className="size-4" /></Link></div></section>
        </div>
      </div>
    </main>
  );
}
