import Link from "next/link";
import { ArrowUpRight, BarChart3, FolderKanban, Search } from "lucide-react";

const stats = [
  ["Researches", "0", "Start your first project"],
  ["Keywords saved", "0", "Build your library"],
  ["Projects", "0", "Organize your research"],
];

export default function DashboardPage() {
  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm text-violet-300">Workspace</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-white">SEO Research Dashboard</h1>
          <p className="mt-2 text-slate-400">Your command center for keyword discovery and content intelligence.</p>
        </div>
        <Link href="/dashboard/research" className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-500"><Search className="size-4" /> New research</Link>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {stats.map(([label, value, hint]) => <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"><p className="text-sm text-slate-400">{label}</p><p className="mt-2 text-3xl font-bold text-white">{value}</p><p className="mt-1 text-xs text-slate-500">{hint}</p></div>)}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex items-center justify-between"><div><h2 className="font-semibold text-white">Start keyword research</h2><p className="mt-1 text-sm text-slate-400">Open the research workspace and generate your first result set.</p></div><BarChart3 className="size-5 text-violet-300" /></div>
          <Link href="/dashboard/research" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-200">Open research workspace <ArrowUpRight className="size-4" /></Link>
        </section>
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"><div className="flex items-center gap-3"><FolderKanban className="size-5 text-cyan-300" /><h2 className="font-semibold text-white">Recent projects</h2></div><div className="mt-8 text-center"><p className="text-sm text-slate-400">No projects yet.</p><Link href="/dashboard/projects" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-violet-300">Create one <ArrowUpRight className="size-4" /></Link></div></section>
      </div>
    </div>
  );
}
