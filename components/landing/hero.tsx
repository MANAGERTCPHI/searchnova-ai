import Link from "next/link";
import { ArrowRight, Check, Search, Sparkles, Zap } from "lucide-react";

const benefits = ["Keyword ideas in seconds", "Search intent clustering", "Content opportunities", "Export-ready research"];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-70" />
      <div className="absolute left-1/2 top-10 -z-0 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-600/20 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-20 lg:px-8 lg:pb-28 lg:pt-28">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-3.5 py-2 text-xs font-medium text-violet-200">
            <Zap className="size-3.5" /> AI-powered SEO intelligence
          </div>
          <h1 className="text-balance text-5xl font-bold tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            Turn search demand into your <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">next growth opportunity.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            SearchNova AI helps you discover high-value keywords, understand intent, and turn research into content strategy without the spreadsheet chaos.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/dashboard" className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3.5 font-semibold shadow-xl shadow-violet-600/20 transition hover:bg-violet-500">
              Start researching free <ArrowRight className="size-4" />
            </Link>
            <Link href="#features" className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10">
              Explore features
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <div key={benefit} className="flex items-center gap-2 text-sm text-slate-300">
              <span className="grid size-5 shrink-0 place-items-center rounded-full bg-emerald-400/10 text-emerald-300"><Check className="size-3.5" /></span>
              {benefit}
            </div>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-5xl rounded-2xl border border-white/10 bg-slate-950/70 p-3 shadow-2xl shadow-violet-950/30">
          <div className="rounded-xl border border-white/10 bg-slate-900/80 p-5 sm:p-7">
            <div className="mb-5 flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-xl bg-violet-500/10 text-violet-300"><Search className="size-5" /></div>
              <div className="flex-1">
                <p className="text-sm font-semibold">Keyword Research</p>
                <p className="text-xs text-slate-500">Discover demand, intent and opportunities</p>
              </div>
              <Sparkles className="size-5 text-violet-300" />
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex-1 rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-slate-300">best productivity apps for teams</div>
              <button className="rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold">Research keywords</button>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {["1,240 ideas", "42 questions", "18 clusters", "9 opportunities"].map((item) => <div key={item} className="rounded-xl border border-white/5 bg-white/[0.03] p-4"><p className="text-sm font-semibold">{item}</p><p className="mt-1 text-xs text-slate-500">AI analysis</p></div>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
