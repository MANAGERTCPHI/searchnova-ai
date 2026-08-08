import { Brain, FileText, Layers3, LineChart, Search, Target } from "lucide-react";

const features = [
  { icon: Search, title: "Keyword discovery", text: "Expand one seed query into structured keyword opportunities and related searches." },
  { icon: Target, title: "Search intent", text: "Separate informational, commercial, navigational, and transactional opportunities." },
  { icon: Brain, title: "AI content intelligence", text: "Turn keyword patterns into briefs, topics, questions, and content angles." },
  { icon: Layers3, title: "Topic clustering", text: "Group related queries into practical content clusters for scalable SEO." },
  { icon: LineChart, title: "Opportunity signals", text: "Prioritize ideas using clear, explainable research signals instead of guesswork." },
  { icon: FileText, title: "Research workspace", text: "Save projects, organize findings, and prepare clean exports for your workflow." },
];

export function Features() {
  return (
    <section id="features" className="border-y border-white/5 bg-slate-950/40 py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-300">Built for modern SEO</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to move from query to strategy.</h2>
          <p className="mt-4 text-slate-400">A focused research system designed to make SEO decisions faster, clearer, and easier to execute.</p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, text }) => (
            <article key={title} className="glass rounded-2xl p-6 transition hover:-translate-y-1 hover:border-violet-400/20">
              <div className="grid size-11 place-items-center rounded-xl bg-violet-500/10 text-violet-300"><Icon className="size-5" /></div>
              <h3 className="mt-5 font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
