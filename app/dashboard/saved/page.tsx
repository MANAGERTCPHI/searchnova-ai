import Link from "next/link";
import { Bookmark, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function SavedKeywordsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div>
        <p className="text-sm text-violet-300">Library</p>
        <h1 className="mt-1 text-3xl font-bold text-white">Saved keywords</h1>
        <div className="mt-8 rounded-2xl border border-white/10 p-8 text-center text-slate-300">
          Sign in to access your saved keywords.
          <br />
          <Link href="/login" className="mt-3 inline-block text-violet-300">Go to login</Link>
        </div>
      </div>
    );
  }

  const { data: keywords, error } = await supabase
    .from("saved_keywords")
    .select("id, keyword, intent, difficulty, relevance, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div>
      <p className="text-sm text-violet-300">Library</p>
      <h1 className="mt-1 text-3xl font-bold text-white">Saved keywords</h1>
      <p className="mt-2 text-slate-400">Your curated keyword opportunities.</p>

      {error ? (
        <div className="mt-8 rounded-2xl border border-red-400/20 bg-red-400/10 p-6 text-sm text-red-300">
          Unable to load saved keywords. Make sure the latest Supabase migration has been applied.
        </div>
      ) : keywords?.length ? (
        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
          <div className="hidden grid-cols-[1fr_130px_110px_110px] gap-4 border-b border-white/10 px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:grid">
            <span>Keyword</span><span>Intent</span><span>Difficulty</span><span>Relevance</span>
          </div>
          {keywords.map((item) => (
            <div key={item.id} className="grid gap-2 border-b border-white/5 px-5 py-4 last:border-0 sm:grid-cols-[1fr_130px_110px_110px] sm:items-center sm:gap-4">
              <span className="font-medium text-white">{item.keyword}</span>
              <span className="text-sm text-slate-400 capitalize">{item.intent}</span>
              <span className="text-sm text-slate-300 capitalize">{item.difficulty}</span>
              <span className="text-sm text-emerald-300">{item.relevance}%</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-white/15 p-12 text-center">
          <Bookmark className="mx-auto size-10 text-slate-500" />
          <h2 className="mt-4 font-semibold text-white">Nothing saved yet</h2>
          <p className="mt-2 text-sm text-slate-400">Run keyword research and save the opportunities you want to revisit.</p>
          <Link href="/dashboard/research" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-violet-300">
            Start research <ExternalLink className="size-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
