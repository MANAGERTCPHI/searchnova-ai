import { Features } from "@/components/landing/features";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { Navbar } from "@/components/landing/navbar";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#07111f]">
      <Navbar />
      <Hero />
      <Features />
      <section id="workflow" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-400/5 p-8 sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-300">Simple workflow</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">Research less. Understand more. Create with confidence.</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {["Enter a topic", "Analyze demand", "Build your strategy"].map((step, index) => (
              <div key={step} className="flex gap-4">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/10 text-sm font-bold">0{index + 1}</span>
                <div><h3 className="font-semibold">{step}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{["Start with a seed keyword, topic, or question that matters to your audience.", "Surface related queries, intent patterns, clusters, and practical opportunities.", "Save the strongest ideas and turn research into a focused content plan."][index]}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="pricing" className="border-t border-white/5 bg-slate-950/40 py-20">
        <div className="mx-auto max-w-3xl px-5 text-center lg:px-8"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-300">Start free</p><h2 className="mt-3 text-3xl font-bold">Build your SEO workflow before you scale it.</h2><p className="mt-4 text-slate-400">SearchNova is being built around a generous free starting experience, with advanced capabilities designed for serious workflows.</p></div>
      </section>
      <Footer />
    </main>
  );
}
