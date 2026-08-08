"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) throw signInError;
      window.location.assign("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  }

  return <form onSubmit={submit} className="mt-7 space-y-4">
    <label className="block text-sm"><span className="mb-2 block text-slate-300">Email</span><input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required autoComplete="email" placeholder="you@example.com" className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 outline-none focus:border-violet-500" /></label>
    <label className="block text-sm"><span className="mb-2 block text-slate-300">Password</span><input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required autoComplete="current-password" placeholder="••••••••" className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 outline-none focus:border-violet-500" /></label>
    {error && <p role="alert" className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">{error}</p>}
    <button disabled={loading} type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 py-3 font-semibold hover:bg-violet-500 disabled:opacity-60">{loading && <Loader2 className="size-4 animate-spin" />}{loading ? "Signing in" : "Sign in"}</button>
    <p className="text-center text-sm text-slate-500">New to SearchNova? <Link href="/signup" className="text-violet-300 hover:text-violet-200">Create an account</Link></p>
  </form>;
}
