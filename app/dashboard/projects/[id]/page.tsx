import Link from "next/link";
import { ArrowLeft, Bookmark, Search } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { data: project } = await supabase.from("projects").select("id,name,description,created_at").eq("id", id).eq("user_id", user.id).single();
  if (!project) notFound();
  const { data: keywords } = await supabase.from("keywords").select("id,keyword,intent,difficulty,opportunity,is_saved").eq("project_id", id).order("created_at", { ascending: false }).limit(100);
  return <div><Link href="/dashboard/projects" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"><ArrowLeft className="size-4"/> Projects</Link><div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm text-violet-300">Project</p><h1 className="mt-1 text-3xl font-bold text-white">{project.name}</h1><p className="mt-2 text-slate-400">{project.description || "No description yet."}</p></div><Link href="/dashboard/research" className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white"><Search className="size-4"/> New research</Link></div><div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"><div className="flex items-center gap-3 border-b border-white/10 p-5"><Bookmark className="size-5 text-cyan-300"/><h2 className="font-semibold text-white">Project keywords</h2></div>{keywords?.length ? <div>{keywords.map((item) => <div key={item.id} className="grid grid-cols-[1fr_120px_90px_100px] gap-4 border-b border-white/5 px-5 py-4 text-sm last:border-0"><span className="font-medium text-white">{item.keyword}</span><span className="text-slate-400">{item.intent || "—"}</span><span className="text-slate-300">{item.difficulty ?? "—"}</span><span className="text-emerald-300">{item.opportunity ?? "—"}</span></div>)}</div> : <div className="p-12 text-center text-sm text-slate-400">No keywords have been assigned to this project yet.</div>}</div></div>;
}
