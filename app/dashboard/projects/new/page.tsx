import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

async function createProject(formData: FormData) {
  "use server";
  const name = String(formData.get("name") || "").trim();
  const description = String(formData.get("description") || "").trim();
  if (!name) return;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { data } = await supabase.from("projects").insert({ user_id: user.id, name, description: description || null }).select("id").single();
  if (data?.id) redirect(`/dashboard/projects/${data.id}`);
  redirect("/dashboard/projects");
}

export default function NewProjectPage() {
  return <div className="mx-auto max-w-2xl"><Link href="/dashboard/projects" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"><ArrowLeft className="size-4" /> Back to projects</Link><div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"><h1 className="text-2xl font-bold text-white">Create a project</h1><p className="mt-2 text-sm text-slate-400">Use a project to group research for a site, client, or campaign.</p><form action={createProject} className="mt-8 space-y-5"><label className="block"><span className="text-sm font-medium text-slate-200">Project name</span><input name="name" required maxLength={100} placeholder="Acme SEO Campaign" className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none ring-violet-500 focus:ring-2" /></label><label className="block"><span className="text-sm font-medium text-slate-200">Description <span className="text-slate-500">(optional)</span></span><textarea name="description" maxLength={500} rows={4} placeholder="Keyword research and content planning for Acme..." className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none ring-violet-500 focus:ring-2" /></label><button type="submit" className="w-full rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-500">Create project</button></form></div></div>;
}
