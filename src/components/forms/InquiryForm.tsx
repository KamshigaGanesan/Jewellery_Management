"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export function InquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // In production, connect to an email API or CRM.
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitted(true);
    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="luxury-card p-8 text-center">
        <h3 className="font-serif text-2xl text-gold">Thank You!</h3>
        <p className="mt-4 text-white/70">
          We&apos;ve received your inquiry. Our team will contact you within 24
          hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="luxury-card space-y-6 p-8">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm text-gold">
          Your Name *
        </label>
        <input
          id="name"
          name="name"
          required
          className="w-full rounded-sm border border-[var(--color-border)] bg-elevated px-4 py-3 focus:border-gold focus:outline-none"
          placeholder="Enter your full name"
        />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-2 block text-sm text-gold">
            Phone Number *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className="w-full rounded-sm border border-[var(--color-border)] bg-elevated px-4 py-3 focus:border-gold focus:outline-none"
            placeholder="021 227 1191"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm text-gold">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full rounded-sm border border-[var(--color-border)] bg-elevated px-4 py-3 focus:border-gold focus:outline-none"
            placeholder="your@email.com"
          />
        </div>
      </div>
      <div>
        <label htmlFor="interest" className="mb-2 block text-sm text-gold">
          I&apos;m interested in
        </label>
        <select
          id="interest"
          name="interest"
          className="w-full rounded-sm border border-[var(--color-border)] bg-elevated px-4 py-3 focus:border-gold focus:outline-none"
        >
          <option value="gold">Gold Jewelry</option>
          <option value="diamond">Diamond Jewelry</option>
          <option value="wedding">Wedding Collection</option>
          <option value="custom">Custom Design</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block text-sm text-gold">
          Your Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className="w-full rounded-sm border border-[var(--color-border)] bg-elevated px-4 py-3 focus:border-gold focus:outline-none"
          placeholder="Tell us what you're looking for..."
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="btn-gold w-full disabled:opacity-50"
      >
        <Send className="h-5 w-5" />
        {loading ? "Sending..." : "Send Inquiry"}
      </button>
    </form>
  );
}
