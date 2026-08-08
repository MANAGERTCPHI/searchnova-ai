"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function SignupForm() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true); setError(""); setMessage("");
    try {
      const supabase = createClient();
      const { data, error: signUpError } = await supabase.auth.signUp({ email, password, options: { data: { display_name: displayName } } });
      if (signUpError) throw signUpError;
      if (data.session) window.location.assign("/dashboard");
      else setMessage("Account created. Check your email to confirm your account, then sign in.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create your account.");
    } finally { setLoading(false); }
  }

  return <form onSubmit={submit} className="mt-7 space-y-4">
    <label className="block text-sm"><span className="mb-2 block text-slate-300">Name</span><input value={displayName} onChange={(e) => setDisplayName(e.target.value)} required minLength={2} placeholder="Your name" className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 outline-none focus:border-violet-500" /></label>
    <label className="block text-sm"><span className="mb-2 block text-slate-300">Email</span><input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required autoComplete="email" placeholder="you@example.com" className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 outline-none focus:border-violet-500" /></label>
    <label className="block text-sm"><span className="mb-2 block text-slate-300">Password</span><input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required minLength={8} autoComplete="new-password" placeholder="At least 8 characters" className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 outline-none focus:border-violet-500" /></label>
    {error && <p role="alert" className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">{error}</p>}
    {message && <p className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">{message}</p>}
    <button disabled={loading} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 py-3 font-semibold hover:bg-violet-500 disabled:opacity-60">{loading && <Loader2 className="size-4 animate-spin" />}{loading ? "Creating account" : "Create account"}</button>
    <p className="text-center text-sm text-slate-500">Already have an account? <Link href="/login" className="text-violet-300 hover:text-violet-200">Sign in</Link></p>
  </form>;
}
