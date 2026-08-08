import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#07111f] px-5 text-white">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"><ArrowLeft className="size-4" /> Back to SearchNova</Link>
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 shadow-2xl sm:p-9">
          <div className="grid size-11 place-items-center rounded-xl bg-violet-600"><Sparkles className="size-5" /></div>
          <h1 className="mt-6 text-2xl font-bold">Welcome back</h1><p className="mt-2 text-sm text-slate-400">Sign in to continue to your SEO workspace.</p>
          <form className="mt-7 space-y-4"><label className="block text-sm"><span className="mb-2 block text-slate-300">Email</span><input type="email" required placeholder="you@example.com" className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 outline-none focus:border-violet-500" /></label><label className="block text-sm"><span className="mb-2 block text-slate-300">Password</span><input type="password" required placeholder="••••••••" className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 outline-none focus:border-violet-500" /></label><button type="submit" className="w-full rounded-xl bg-violet-600 py-3 font-semibold hover:bg-violet-500">Sign in</button></form>
          <p className="mt-6 text-center text-sm text-slate-500">Authentication will be connected to Supabase in the next phase.</p>
        </div>
      </div>
    </main>
  );
}
