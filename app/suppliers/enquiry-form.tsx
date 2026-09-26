"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm focus:border-neutral-900 focus:outline-none focus:ring-0 transition-colors";
const labelClass = "mb-1.5 block text-sm font-semibold text-neutral-900";

const TYPES = ["Brand or manufacturer", "Distributor or wholesaler", "Other"];
const PRODUCT_COUNTS = ["1 to 10", "11 to 50", "51 to 200", "200+"];

const empty = {
  name: "",
  company: "",
  email: "",
  phone: "",
  website: "",
  type: TYPES[0],
  categories: [] as string[],
  productCount: "",
  message: "",
  companyFax: "",
};

export function SupplierEnquiryForm({ categories }: { categories: string[] }) {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  const set = (patch: Partial<typeof empty>) => setForm((f) => ({ ...f, ...patch }));
  const toggleCategory = (c: string) =>
    set({ categories: form.categories.includes(c) ? form.categories.filter((x) => x !== c) : [...form.categories, c] });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/supplier-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      setStatus("sent");
      setForm(empty);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("idle");
    }
  };

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-neutral-200 p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-primary-500" />
        <h3 className="mt-3 text-lg font-semibold text-neutral-900">Thanks, we&apos;ve got your enquiry</h3>
        <p className="mt-1 text-sm text-neutral-600">
          We&apos;ll review your range and reply within 5 working days if it&apos;s a good fit.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5 rounded-2xl border border-neutral-200 p-5 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="s-name" className={labelClass}>Your name</label>
          <input id="s-name" required autoComplete="name" value={form.name} onChange={(e) => set({ name: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label htmlFor="s-company" className={labelClass}>Company</label>
          <input id="s-company" required autoComplete="organization" value={form.company} onChange={(e) => set({ company: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label htmlFor="s-email" className={labelClass}>Email</label>
          <input id="s-email" type="email" required autoComplete="email" value={form.email} onChange={(e) => set({ email: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label htmlFor="s-phone" className={labelClass}>Phone <span className="font-normal text-neutral-500">(optional)</span></label>
          <input id="s-phone" type="tel" autoComplete="tel" value={form.phone} onChange={(e) => set({ phone: e.target.value })} className={inputClass} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="s-website" className={labelClass}>Website or product catalogue link <span className="font-normal text-neutral-500">(optional)</span></label>
          <input id="s-website" type="url" placeholder="https://" value={form.website} onChange={(e) => set({ website: e.target.value })} className={inputClass} />
        </div>
      </div>

      <fieldset>
        <legend className={labelClass}>Which best describes you?</legend>
        <div className="flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <label key={t} className={cn("cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors", form.type === t ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-300 text-neutral-700 hover:border-neutral-900")}>
              <input type="radio" name="type" value={t} checked={form.type === t} onChange={() => set({ type: t })} className="sr-only" />
              {t}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className={labelClass}>Product categories</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {categories.map((c) => (
            <label key={c} className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-neutral-200 px-3 py-2.5 text-sm text-neutral-700 hover:border-neutral-400">
              <input type="checkbox" checked={form.categories.includes(c)} onChange={() => toggleCategory(c)} className="h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900" />
              {c}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="s-count" className={labelClass}>How many products do you have? <span className="font-normal text-neutral-500">(optional)</span></label>
        <select id="s-count" value={form.productCount} onChange={(e) => set({ productCount: e.target.value })} className={cn(inputClass, "bg-white")}>
          <option value="">Select</option>
          {PRODUCT_COUNTS.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="s-message" className={labelClass}>Tell us about your products</label>
        <textarea
          id="s-message"
          required
          rows={5}
          minLength={20}
          placeholder="What you make or distribute, typical trade prices, stock levels and where your products are sold now."
          value={form.message}
          onChange={(e) => set({ message: e.target.value })}
          className={inputClass}
        />
      </div>

      {/* Honeypot for bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="s-fax">Fax</label>
        <input id="s-fax" tabIndex={-1} autoComplete="off" value={form.companyFax} onChange={(e) => set({ companyFax: e.target.value })} />
      </div>

      {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-500 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-600 disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" && <Loader2 className="h-4 w-4 animate-spin" />}
        Send enquiry
      </button>
      <p className="text-xs text-neutral-500">We only use these details to reply to your enquiry.</p>
    </form>
  );
}
