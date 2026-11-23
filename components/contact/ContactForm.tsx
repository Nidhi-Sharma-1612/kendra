"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { cabins } from "@/data/cabins";
import { site } from "@/data/site";

const TOPICS = ["Booking question", "Pets", "Celebrating an occasion", "Specials & add-ons", "Current reservation", "Something else"];

type FieldName = "name" | "email" | "phone" | "topic" | "cabin" | "dates" | "message";
type Errors = Partial<Record<FieldName, string>>;

const input =
  "mt-1.5 w-full rounded-xl border border-vellum bg-paper px-4 py-3 text-heather-900 outline-none transition placeholder:text-ink-400 focus:border-heather-700 focus:ring-2 focus:ring-heather-700/10 aria-[invalid=true]:border-blossom-500";

function Field({ label, error, optional, children }: { label: string; error?: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-heather-900">
        {label} {optional && <span className="font-normal text-ink-400">(optional)</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-sm text-blossom-500">{error}</span>}
    </label>
  );
}

/** Contact form: posts to /api/contact, which emails the owner (or runs in demo mode without a Resend key). */
export function ContactForm() {
  const [values, setValues] = useState<Record<FieldName, string>>({ name: "", email: "", phone: "", topic: TOPICS[0], cabin: "", dates: "", message: "" });
  const [company, setCompany] = useState(""); // honeypot
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "demo">("idle");

  const set = (k: FieldName) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  async function submit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setFormError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, company }),
      });
      const body = await res.json();
      if (!res.ok) {
        setErrors(body.fieldErrors ?? {});
        setFormError(body.error);
        setStatus("idle");
        return;
      }
      setStatus(body.mode === "demo" ? "demo" : "sent");
    } catch {
      setFormError(`We couldn't send your message. Please call or text ${site.phone}.`);
      setStatus("idle");
    }
  }

  if (status === "sent" || status === "demo") {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-[1.75rem] border border-vellum bg-paper-deep/60 p-8 text-center sm:p-12" role="status">
        <span className="grid size-14 place-items-center rounded-full bg-sage-200 text-sage-700">
          <CheckCircle2 className="size-7" aria-hidden />
        </span>
        <h2 className="mt-5 font-display text-4xl text-heather-900">Thank you, {values.name.split(" ")[0]}.</h2>
        <p className="mt-3 max-w-md text-ink-600">
          Your message is on its way. We&apos;ll reply to <span className="font-semibold break-all text-heather-900">{values.email}</span>. For anything urgent, call or text{" "}
          <a href={site.phoneHref} className="font-semibold text-heather-900 underline underline-offset-2">
            {site.phone}
          </a>
          .
        </p>
        {status === "demo" && (
          <p className="mt-5 rounded-xl bg-paper px-4 py-2 text-xs text-ink-600">Demo mode: add RESEND_API_KEY to deliver messages by email.</p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="relative h-full rounded-[1.75rem] border border-vellum bg-paper-deep/60 p-6 sm:p-9">
      <h2 className="font-display text-3xl leading-tight text-heather-900 sm:text-4xl">Send us a message</h2>
      <p className="mt-1 text-ink-600">Questions about a cabin, pets or a celebration? We&apos;ll get back to you.</p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <Field label="Your name" error={errors.name}>
          <input className={input} value={values.name} onChange={set("name")} autoComplete="name" aria-invalid={!!errors.name} />
        </Field>
        <Field label="Email" error={errors.email}>
          <input type="email" className={input} value={values.email} onChange={set("email")} autoComplete="email" aria-invalid={!!errors.email} />
        </Field>
        <Field label="Phone" optional>
          <input type="tel" className={input} value={values.phone} onChange={set("phone")} autoComplete="tel" />
        </Field>
        <Field label="What's it about?">
          <select className={input} value={values.topic} onChange={set("topic")}>
            {TOPICS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Field>
        <Field label="Cabin" optional>
          <select className={input} value={values.cabin} onChange={set("cabin")}>
            <option value="">Not sure yet</option>
            {cabins.map((c) => (
              <option key={c.slug}>{c.name}</option>
            ))}
          </select>
        </Field>
        <Field label="Travel dates" optional>
          <input className={input} value={values.dates} onChange={set("dates")} placeholder="e.g. Oct 10–13" />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Message" error={errors.message}>
            <textarea rows={5} className={input} value={values.message} onChange={set("message")} aria-invalid={!!errors.message} placeholder="Tell us what you're planning…" />
          </Field>
        </div>
        {/* Honeypot for bots; hidden from people and screen readers. */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="absolute -left-[9999px] size-px opacity-0"
        />
      </div>

      {formError && <p className="mt-5 rounded-xl bg-blossom-100 px-4 py-3 text-sm text-heather-900">{formError}</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="group mt-7 inline-flex items-center gap-3 rounded-full bg-heather-900 py-2 pr-2 pl-7 font-semibold text-paper transition hover:bg-heather-700 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
        <span className="grid size-10 place-items-center rounded-full bg-paper text-heather-900 transition-transform group-hover:translate-x-0.5">
          {status === "sending" ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <ArrowRight className="size-4" aria-hidden />}
        </span>
      </button>
    </form>
  );
}
