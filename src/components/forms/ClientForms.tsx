"use client";

import { FormEvent, useState } from "react";

export function AuthForm() {
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    setMessage(response.ok ? "Success. You can now access your dashboard." : data.error || "Failed");
  }

  return (
    <form onSubmit={onSubmit} className="luxury-card space-y-4 p-6">
      <input className="w-full rounded-xl border p-3" name="email" type="email" placeholder="Email" required />
      <input className="w-full rounded-xl border p-3" name="password" type="password" placeholder="Password" required />
      <button className="btn-gold w-full" type="submit">
        Login
      </button>
      {message && <p className="text-sm text-muted">{message}</p>}
    </form>
  );
}

export function AppointmentForm() {
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    const response = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setMessage(response.ok ? "Appointment request submitted." : "Unable to submit appointment.");
  }

  return (
    <form onSubmit={onSubmit} className="luxury-card grid gap-3 p-6">
      <input className="rounded-xl border p-3" name="name" placeholder="Full name" required />
      <input className="rounded-xl border p-3" name="email" type="email" placeholder="Email" required />
      <input className="rounded-xl border p-3" name="phone" placeholder="Phone" required />
      <input className="rounded-xl border p-3" name="date" type="date" required />
      <input className="rounded-xl border p-3" name="time" type="time" required />
      <select className="rounded-xl border p-3" name="mode" defaultValue="showroom">
        <option value="showroom">Showroom visit</option>
        <option value="video-call">Video call</option>
      </select>
      <textarea className="rounded-xl border p-3" name="notes" placeholder="Bridal notes / style preference" rows={4} />
      <button className="btn-gold" type="submit">Book Consultation</button>
      {message && <p className="text-sm text-muted">{message}</p>}
    </form>
  );
}

export function CustomOrderForm() {
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const response = await fetch("/api/custom-orders", { method: "POST", body: formData });
    setMessage(response.ok ? "Custom order inquiry submitted." : "Submission failed.");
    if (response.ok) form.reset();
  }

  return (
    <form onSubmit={onSubmit} className="luxury-card grid gap-3 p-6">
      <input className="rounded-xl border p-3" name="customerName" placeholder="Customer name" required />
      <input className="rounded-xl border p-3" name="email" type="email" placeholder="Email" required />
      <input className="rounded-xl border p-3" name="phone" placeholder="Phone" required />
      <input className="rounded-xl border p-3" name="budget" type="number" placeholder="Budget (LKR)" required />
      <select className="rounded-xl border p-3" name="goldType" defaultValue="22K">
        <option value="22K">22K Gold</option>
        <option value="24K">24K Gold</option>
        <option value="Silver">Silver</option>
      </select>
      <textarea className="rounded-xl border p-3" name="description" rows={4} placeholder="Design details and bridal usage" required />
      <textarea className="rounded-xl border p-3" name="notes" rows={3} placeholder="Extra notes" />
      <input className="rounded-xl border p-3" name="image" type="file" accept="image/*" required />
      <button className="btn-gold" type="submit">Submit Custom Inquiry</button>
      {message && <p className="text-sm text-muted">{message}</p>}
    </form>
  );
}
