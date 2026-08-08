"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, Loader2, Search, Sparkles } from "lucide-react";

interface Idea {
  keyword: string;
  intent: string;
  difficulty: number;
  opportunity: number;
}

export function KeywordResearch() {
  const [query, setQuery] = useState("");
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, language: "English", country: "Nigeria" }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Research failed.");
      setIdeas(data.ideas);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Research failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-sm font-semibold text-violet-300"><Sparkles className="size-4" /> Keyword intelligence</div>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">Discover your next content opportunity.</h1>
        <p className="mt-2 max-w-2xl text-slate-400">Start with a topic or seed keyword. SearchNova turns it into a structured set of ideas, intent signals, and opportunities.</p>
      </div>

      <form onSubmit={submit} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 shadow-2xl shadow-black/10 sm:flex sm:items-center">
        <div className="flex min-w-0 flex-1 items-center gap-3 px-3"><Search className="size-5 shrink-0 text-slate-500" /><input value={query} onChange={(e) => setQuery(e.target.value)} required minLength={2} placeholder="e.g. digital marketing" className="w-full bg-transparent py-3 text-white outline-none placeholder:text-slate-600" /></div>
        <button disabled={loading} className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60 sm:mt-0 sm:w-auto">{loading ? <Loader2 className="size-4 animate-spin" /> : <ArrowUpRight className="size-4" />}{loading ? "Researching" : "Research keyword"}</button>
      </form>

      {error && <p className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">{error}</p>}

      {ideas.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
          <div className="border-b border-white/10 px-5 py-4"><h2 className="font-semibold text-white">Keyword opportunities</h2><p className="mt-1 text-sm text-slate-500">Initial research results for “{query}”.</p></div>
          <div className="divide-y divide-white/5">
            {ideas.map((idea) => <div key={idea.keyword} className="grid gap-3 px-5 py-4 sm:grid-cols-[1fr_auto_auto_auto] sm:items-center"><div><p className="font-medium text-slate-200">{idea.keyword}</p><p className="mt-1 text-xs text-slate-500">{idea.intent} intent</p></div><span className="text-xs text-slate-400">Difficulty <strong className="text-slate-200">{idea.difficulty}</strong></span><span className="text-xs text-slate-400">Opportunity <strong className="text-emerald-300">{idea.opportunity}%</strong></span><button className="text-left text-sm font-medium text-violet-300 hover:text-violet-200 sm:text-right">Save</button></div>)}
          </div>
        </div>
      )}
    </section>
  );
}
