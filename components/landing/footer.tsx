import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold text-white"><span className="grid size-8 place-items-center rounded-lg bg-violet-600"><Sparkles className="size-4" /></span>SearchNova AI</Link>
        <div className="flex gap-5"><Link href="/privacy" className="hover:text-white">Privacy</Link><Link href="/terms" className="hover:text-white">Terms</Link><span>© {new Date().getFullYear()} SearchNova AI</span></div>
      </div>
    </footer>
  );
}
