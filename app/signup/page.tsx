import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { SignupForm } from "@/components/auth/signup-form";

export default function SignupPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#07111f] px-5 text-white">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"><ArrowLeft className="size-4" /> Back to SearchNova</Link>
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 shadow-2xl sm:p-9">
          <div className="grid size-11 place-items-center rounded-xl bg-violet-600"><Sparkles className="size-5" /></div>
          <h1 className="mt-6 text-2xl font-bold">Create your workspace</h1>
          <p className="mt-2 text-sm text-slate-400">Start building a focused SEO research workflow.</p>
          <SignupForm />
        </div>
      </div>
    </main>
  );
}
