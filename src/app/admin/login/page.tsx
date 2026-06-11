"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole, Sparkles, Mail } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("owner@indiranjewellers.lk");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("Sign in to update daily gold rates.");
  const [loading, setLoading] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage("Checking credentials...");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok || data?.user?.role !== "admin") {
        setMessage("Incorrect password. Try again.");
        return;
      }

      router.push("/update-gold-rate");
      router.refresh();
    } catch {
      setMessage("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-ribbon flex min-h-screen items-center justify-center px-4 py-28">
      <div className="luxury-panel w-full max-w-2xl p-8 md:p-12">
        <div className="flex items-center gap-3 text-gold">
          <Sparkles className="h-5 w-5" />
          <p className="text-xs uppercase tracking-[0.45em] text-gold/70">Owner Login</p>
        </div>
        <h1 className="heading-lg mt-4 text-[#2b1c15]">Owner gold rate access</h1>
        <p className="mt-4 max-w-xl text-sm leading-6 text-[var(--color-text-muted)]">
          Sign in to update today&apos;s 22K, 24K and silver rates quickly.
        </p>

        <form onSubmit={submit} className="mt-8 space-y-5">
          <label className="block space-y-2">
            <span className="text-xs uppercase tracking-[0.35em] text-[var(--color-text-muted)]">Email</span>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold/80" />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-2xl border border-gold/15 bg-white/80 py-4 pl-12 pr-4 text-[#2b1c15] outline-none transition-colors placeholder:text-[#8f7e6a] focus:border-gold"
                placeholder="owner@indiranjewellers.lk"
              />
            </div>
          </label>
          <label className="block space-y-2">
            <span className="text-xs uppercase tracking-[0.35em] text-[var(--color-text-muted)]">Password</span>
            <div className="relative">
              <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold/80" />
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-2xl border border-gold/15 bg-white/80 py-4 pl-12 pr-4 text-[#2b1c15] outline-none transition-colors placeholder:text-[#8f7e6a] focus:border-gold"
                placeholder="Enter owner password"
              />
            </div>
          </label>
          <button type="submit" disabled={loading} className="btn-gold w-full py-4 text-base">
            {loading ? "Signing in..." : "Open Gold Rate Update"}
          </button>
        </form>

        <p className="mt-5 text-sm text-[var(--color-text-muted)]">{message}</p>
      </div>
    </section>
  );
}
