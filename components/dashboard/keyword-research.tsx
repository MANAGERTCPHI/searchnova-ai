"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, Check, Loader2, Search, Sparkles } from "lucide-react";

type Intent = "informational" | "commercial" | "transactional" | "navigational";
type Difficulty = "easy" | "medium" | "hard";
type Source = "seed" | "question" | "comparison" | "modifier";

interface Idea {
  keyword: string;
  intent: Intent;
  relevance: number;
  difficulty: Difficulty;
  source: Source;
}

interface ResearchResponse {
  seed: string;
  ideas: Idea[];
  questions: string[];
  contentIdeas: string[];
  generatedAt: string;
}

const difficultyLabel: Record<Difficulty, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

const intentLabel: Record<Intent, string> = {
  informational: "Informational",
  commercial: "Commercial",
  transactional: "Transactional",
  navigational: "Navigational",
};

export function KeywordResearch() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<ResearchResponse | null>(null);
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const keyword = query.trim();
    if (keyword.length < 2) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Research failed.");
      setResult(data as ResearchResponse);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Research failed.");
    } finally {
      setLoading(false);
    }
  }

  async function toggleSave(idea: Idea) {
    setSaving((current) => ({ ...current, [idea.keyword]: true }));
    setError("");

    try {
      const isSaved = saved[idea.keyword] === true;
      const response = await fetch("/api/keywords", {
        method: isSaved ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isSaved
            ? { keyword: idea.keyword }
            : {
                keyword: idea.keyword,
                seed: result?.seed ?? query.trim(),
                intent: idea.intent,
                difficulty: idea.difficulty,
                relevance: idea.relevance,
                source: idea.source,
              },
        ),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Unable to update saved keywords.");
      setSaved((current) => ({ ...current, [idea.keyword]: !isSaved }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to update saved keywords.");
    } finally {
      setSaving((current) => ({ ...current, [idea.keyword]: false }));
    }
  }

  return (
    <section className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-sm font-semibold text-violet-300">
          <Sparkles className="size-4" /> Keyword intelligence
        </div>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">Discover your next content opportunity.</h1>
        <p className="mt-2 max-w-2xl text-slate-400">
          Start with a seed keyword. SearchNova generates structured ideas, search intent, difficulty signals, questions, and content opportunities.
        </p>
      </div>

      <form onSubmit={submit} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 shadow-2xl shadow-black/10 sm:flex sm:items-center">
        <div className="flex min-w-0 flex-1 items-center gap-3 px-3">
          <Search className="size-5 shrink-0 text-slate-500" aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            required
            minLength={2}
            maxLength={120}
            placeholder="e.g. digital marketing"
            aria-label="Seed keyword"
            className="w-full bg-transparent py-3 text-white outline-none placeholder:text-slate-600"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60 sm:mt-0 sm:w-auto"
        >
          {loading ? <Loader2 className="size-4 animate-spin" /> : <ArrowUpRight className="size-4" />}
          {loading ? "Researching" : "Research keyword"}
        </button>
      </form>

      {error && <p role="alert" className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">{error}</p>}

      {result && (
        <div className="space-y-6">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
            <div className="border-b border-white/10 px-5 py-4">
              <h2 className="font-semibold text-white">Keyword opportunities</h2>
              <p className="mt-1 text-sm text-slate-500">Research results for “{result.seed}”.</p>
            </div>
            <div className="divide-y divide-white/5">
              {result.ideas.map((idea) => {
                const isSaved = saved[idea.keyword] === true;
                const isSaving = saving[idea.keyword] === true;
                return (
                  <div key={idea.keyword} className="grid gap-3 px-5 py-4 sm:grid-cols-[1fr_auto_auto_auto] sm:items-center">
                    <div>
                      <p className="font-medium text-slate-200">{idea.keyword}</p>
                      <p className="mt-1 text-xs text-slate-500">{intentLabel[idea.intent]} intent · {idea.source}</p>
                    </div>
                    <span className="text-xs text-slate-400">Difficulty <strong className="text-slate-200">{difficultyLabel[idea.difficulty]}</strong></span>
                    <span className="text-xs text-slate-400">Relevance <strong className="text-emerald-300">{idea.relevance}%</strong></span>
                    <button
                      type="button"
                      onClick={() => toggleSave(idea)}
                      disabled={isSaving}
                      aria-label={`${isSaved ? "Remove" : "Save"} ${idea.keyword}`}
                      className="inline-flex items-center justify-start gap-1.5 text-sm font-medium text-violet-300 hover:text-violet-200 disabled:opacity-60 sm:justify-end"
                    >
                      {isSaving ? <Loader2 className="size-4 animate-spin" /> : isSaved ? <Check className="size-4" /> : null}
                      {isSaved ? "Saved" : "Save"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <h2 className="font-semibold text-white">Questions to answer</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-400">
                {result.questions.map((question) => <li key={question}>{question}</li>)}
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <h2 className="font-semibold text-white">Content opportunities</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-400">
                {result.contentIdeas.map((idea) => <li key={idea}>{idea}</li>)}
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
