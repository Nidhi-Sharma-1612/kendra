import type { Metadata } from "next";
import Link from "next/link";
import { allPosts } from "@/lib/guide";
import { FeaturedPost, PostCard } from "@/components/guide/PostCard";
import { Reveal } from "@/components/ui/Reveal";
import { BookDirect } from "@/components/home/BookDirect";

export const metadata: Metadata = {
  title: "Smoky Mountain Guide",
  description:
    "Local ideas for the Great Smoky Mountains: when to see fall color, waterfall hikes, romantic weekends and winter trips, from your hosts near Gatlinburg.",
};

export default async function GuidePage({
  searchParams,
}: PageProps<"/smoky-mountain-guide">) {
  const { category } = await searchParams;
  const posts = allPosts();
  const categories = Array.from(new Set(posts.map((p) => p.category)));
  const active =
    typeof category === "string" && (categories as string[]).includes(category)
      ? category
      : null;
  const shown = active ? posts.filter((p) => p.category === active) : posts;
  const [featured, ...rest] = shown;

  return (
    <>
      {/* Header */}
      <section className="mx-auto max-w-7xl px-4 pt-16 pb-10 sm:px-10 lg:px-14 lg:pt-24">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <Reveal>
            <p className="label flex items-center gap-3 text-sage-700">
              <span className="h-px w-8 bg-sage-500/60" aria-hidden /> Smoky
              Mountain Guide
            </p>
            <h1 className="mt-5 font-display text-5xl leading-[1] font-medium text-heather-900 sm:text-7xl">
              Notes from
              <em className="block text-blossom-500">the mountain.</em>
            </h1>
          </Reveal>
          <Reveal delay={0.1} className="lg:pb-2">
            <p className="max-w-md text-lg leading-relaxed text-ink-600">
              Seasons, trails and slow days out. Local ideas for making the most
              of your time in the Smokies, from your hosts on the mountain.
            </p>
          </Reveal>
        </div>

        {/* Category pills */}
        <Reveal delay={0.1}>
          <nav aria-label="Guide topics" className="mt-10 flex flex-wrap gap-2">
            {[null, ...categories].map((c) => {
              const on = c === active;
              return (
                <Link
                  key={c ?? "all"}
                  href={
                    c
                      ? `/smoky-mountain-guide?category=${encodeURIComponent(c)}`
                      : "/smoky-mountain-guide"
                  }
                  scroll={false}
                  aria-current={on ? "page" : undefined}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    on
                      ? "bg-heather-900 text-paper"
                      : "border border-vellum bg-paper text-heather-900 hover:border-heather-700/40"
                  }`}
                >
                  {c ?? "All stories"}
                </Link>
              );
            })}
          </nav>
        </Reveal>
      </section>

      {/* Posts */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-10 lg:px-14 lg:pb-32">
        {!featured && (
          <div className="mx-auto max-w-lg rounded-[1.75rem] border border-dashed border-vellum px-6 py-14 text-center">
            <p className="font-display text-3xl text-heather-900">
              New stories are on the way
            </p>
            <Link
              href="/smoky-mountain-guide"
              className="mt-6 inline-flex rounded-full bg-heather-900 px-5 py-3 text-sm font-semibold text-paper hover:bg-heather-700"
            >
              All stories
            </Link>
          </div>
        )}
        {featured && (
          <Reveal>
            <FeaturedPost post={featured} />
          </Reveal>
        )}
        {rest.length > 0 && (
          <>
            <h2 className="label mt-16 flex items-center gap-3 text-sage-700">
              <span className="h-px w-8 bg-sage-500/60" aria-hidden /> More
              stories
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 0.08}>
                  <PostCard post={p} />
                </Reveal>
              ))}
            </div>
          </>
        )}
      </section>

      <BookDirect />
    </>
  );
}
