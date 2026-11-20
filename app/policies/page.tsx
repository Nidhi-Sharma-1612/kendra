import type { Metadata } from "next";
import { policies, site } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = { title: "Good to Know", description: "Check-in times, house rules and reservation policies." };

export default function PoliciesPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:py-24">
      <Reveal>
        <p className="label text-sage-700">Before you go</p>
        <h1 className="mt-4 font-display text-5xl font-medium text-heather-900 sm:text-6xl">Good to know</h1>
        <p className="mt-5 max-w-2xl text-lg text-ink-600">A few things that help every stay go smoothly. Questions? Call us at {site.phone}.</p>
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {policies.items.map((p, i) => (
          <Reveal key={p.title} delay={(i % 2) * 0.06} className="rounded-3xl border border-vellum bg-white/60 p-6">
            <h2 className="font-display text-2xl font-semibold text-heather-900">{p.title}</h2>
            <p className="mt-2 leading-relaxed text-ink-600">{p.body}</p>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10 rounded-3xl bg-blossom-100 p-7">
        <h2 className="font-display text-2xl font-semibold text-heather-900">Cancellations & changes</h2>
        <p className="mt-2 leading-relaxed text-ink-600">{policies.cancellation}</p>
        <p className="mt-2 text-ink-600">For date changes, email <a href={`mailto:${site.email}`} className="font-semibold text-heather-700 hover:underline">{site.email}</a>.</p>
      </Reveal>
    </section>
  );
}
