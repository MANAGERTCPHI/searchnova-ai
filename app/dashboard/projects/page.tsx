import Link from "next/link";
import { FolderKanban, Plus, Search } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: projects } = user
    ? await supabase.from("projects").select("id,name,description,created_at").eq("user_id", user.id).order("created_at", { ascending: false })
    : { data: [] };

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><p className="text-sm text-violet-300">Workspace</p><h1 className="mt-1 text-3xl font-bold text-white">Projects</h1><p className="mt-2 text-slate-400">Organize keyword research by client, campaign, or website.</p></div>
        <Link href="/dashboard/projects/new" className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-500"><Plus className="size-4" /> New project</Link>
      </div>
      {!user ? <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center"><p className="text-slate-300">Sign in to manage projects.</p><Link href="/login" className="mt-4 inline-block text-violet-300">Go to login</Link></div> : projects?.length ? <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{projects.map((project) => <Link key={project.id} href={`/dashboard/projects/${project.id}`} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-violet-400/40 hover:bg-white/[0.05]"><div className="flex items-start justify-between"><FolderKanban className="size-5 text-cyan-300" /><Search className="size-4 text-slate-500" /></div><h2 className="mt-6 font-semibold text-white">{project.name}</h2><p className="mt-2 line-clamp-2 text-sm text-slate-400">{project.description || "No description yet."}</p></Link>)}</div> : <div className="mt-8 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-12 text-center"><FolderKanban className="mx-auto size-10 text-slate-500" /><h2 className="mt-4 font-semibold text-white">No projects yet</h2><p className="mx-auto mt-2 max-w-md text-sm text-slate-400">Create your first project to keep research, keywords, and content opportunities together.</p><Link href="/dashboard/projects/new" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950"><Plus className="size-4" /> Create project</Link></div>}
    </div>
  );
}
