"use client";

import { FormEvent, useState } from "react";

export default function ForgotPasswordPage() {
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const response = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setMessage(response.ok ? "Reset instructions sent." : "Unable to process request.");
  }

  return (
    <section className="mx-auto max-w-xl px-4 pb-14 pt-24 md:pt-28">
      <h1 className="heading-lg mb-5">Forgot Password</h1>
      <form onSubmit={onSubmit} className="luxury-card space-y-3 p-6">
        <input className="w-full rounded-xl border p-3" name="email" type="email" placeholder="Your email" required />
        <button className="btn-gold w-full">Send Reset Link</button>
        {message && <p className="text-sm text-muted">{message}</p>}
      </form>
    </section>
  );
}
