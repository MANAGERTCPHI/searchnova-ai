import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07111f]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <span className="grid size-9 place-items-center rounded-xl bg-violet-600 shadow-lg shadow-violet-600/20">
            <Sparkles className="size-5" />
          </span>
          <span className="text-lg">SearchNova <span className="text-violet-400">AI</span></span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-slate-300 md:flex">
          <Link href="#features" className="transition hover:text-white">Features</Link>
          <Link href="#workflow" className="transition hover:text-white">How it works</Link>
          <Link href="#pricing" className="transition hover:text-white">Pricing</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/login" className="hidden px-3 py-2 text-sm text-slate-300 hover:text-white sm:block">Sign in</Link>
          <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-100">
            Get started <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
