import Link from "next/link";
import { Clock3, Search } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function HistoryPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div>
        <p className="text-sm text-violet-300">Activity</p>
        <h1 className="mt-1 text-3xl font-bold text-white">Search history</h1>
        <div className="mt-8 rounded-2xl border border-white/10 p-8 text-center text-slate-300">
          Sign in to see your history. <Link href="/login" className="text-violet-300">Login</Link>
        </div>
      </div>
    );
  }

  const { data: researches, error } = await supabase
    .from("keyword_researches")
    .select("id, seed, result_count, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <div>
      <p className="text-sm text-violet-300">Activity</p>
      <h1 className="mt-1 text-3xl font-bold text-white">Search history</h1>
      <p className="mt-2 text-slate-400">Review your previous keyword research sessions.</p>

      {error ? (
        <div className="mt-8 rounded-2xl border border-red-400/20 bg-red-400/10 p-6 text-sm text-red-300">
          Unable to load research history. Make sure the latest Supabase migration has been applied.
        </div>
      ) : researches?.length ? (
        <div className="mt-8 space-y-3">
          {researches.map((item) => (
            <div key={item.id} className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-violet-500/10 p-3"><Search className="size-5 text-violet-300" /></div>
                <div>
                  <h2 className="font-semibold text-white">{item.seed}</h2>
                  <p className="mt-1 text-sm text-slate-400">{item.result_count} keyword opportunities</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Clock3 className="size-4" />
                {new Date(item.created_at).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-white/15 p-12 text-center">
          <Clock3 className="mx-auto size-10 text-slate-500" />
          <h2 className="mt-4 font-semibold text-white">No research history</h2>
          <p className="mt-2 text-sm text-slate-400">Your completed searches will appear here.</p>
          <Link href="/dashboard/research" className="mt-6 inline-flex rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white">Start research</Link>
        </div>
      )}
    </div>
  );
}
