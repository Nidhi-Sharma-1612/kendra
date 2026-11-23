import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import { posts } from "@/data/guide";
import { cabins } from "@/data/cabins";
import { getFromPrices } from "@/lib/webrez";
import { site } from "@/data/site";
import {
  extractHeadings,
  formatPostDate,
  getPost,
  headingId,
  readMinutes,
  relatedPosts,
} from "@/lib/guide";
import { ArticleBody } from "@/components/guide/ArticleBody";
import { PostCard } from "@/components/guide/PostCard";
import { ReadingProgress } from "@/components/guide/ReadingProgress";
import { CabinTile } from "@/components/ui/CabinTile";
import { Reveal } from "@/components/ui/Reveal";

export const dynamicParams = false;
export const revalidate = 3600;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/smoky-mountain-guide/[slug]">): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image.src],
      type: "article",
    },
  };
}

export default async function GuidePostPage({
  params,
}: PageProps<"/smoky-mountain-guide/[slug]">) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const headings = extractHeadings(post.body);
  const related = relatedPosts(post);
  const stayCabins = cabins.filter((c) => post.cabins?.includes(c.slug));
  const prices = stayCabins.length
    ? await getFromPrices(stayCabins.map((c) => c.webrezId))
    : {};

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    image: post.image.src,
    publisher: { "@type": "Organization", name: site.name },
  };

  return (
    <>
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <header className="mx-auto max-w-7xl px-4 pt-12 sm:px-10 lg:px-14 lg:pt-16">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-1.5 text-sm font-medium text-ink-600"
        >
          <Link
            href="/smoky-mountain-guide"
            className="inline-flex items-center gap-2 transition hover:text-heather-900"
          >
            <ArrowLeft className="size-4" aria-hidden /> Smoky Mountain Guide
          </Link>
          <ChevronRight className="size-4 text-ink-400" aria-hidden />
          <Link
            href={`/smoky-mountain-guide?category=${encodeURIComponent(post.category)}`}
            className="transition hover:text-heather-900"
          >
            {post.category}
          </Link>
        </nav>
        <Reveal className="mt-8 max-w-4xl">
          <p className="label flex items-center gap-3 text-sage-700">
            <span className="h-px w-8 bg-sage-500/60" aria-hidden />{" "}
            {post.category}
          </p>
          <h1 className="mt-5 font-display text-4xl leading-[1.04] font-medium text-balance text-heather-900 sm:text-6xl">
            {post.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-600">
            {post.excerpt}
          </p>
          <p className="mt-5 text-sm text-ink-400">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time> ·{" "}
            {readMinutes(post.body)} min read
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <figure className="relative mt-10 aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-heather-950 sm:aspect-[21/9]">
            <Image
              src={post.image.src}
              alt={post.image.alt}
              fill
              priority
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="object-cover"
            />
          </figure>
        </Reveal>
      </header>

      {/* Body with a sticky index */}
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-10 lg:grid-cols-[14rem_1fr] lg:gap-16 lg:px-14 lg:py-20">
        <nav
          aria-label="In this guide"
          className={headings.length > 2 ? "hidden lg:block" : "hidden"}
        >
          <div className="sticky top-28">
            <p className="label text-ink-400">In this guide</p>
            <ul className="mt-4 space-y-1 border-l border-vellum">
              {headings.map((h) => (
                <li key={h}>
                  <a
                    href={`#${headingId(h)}`}
                    className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm text-ink-600 transition hover:border-blossom-500 hover:text-heather-900"
                  >
                    {h}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <article className="min-w-0 max-w-[44rem]">
          <ArticleBody markdown={post.body} />

          {/* Stay with us: only when the post has no cabins of its own below */}
          {stayCabins.length === 0 && (
            <aside className="paper relative mt-14 overflow-hidden rounded-[1.75rem] bg-heather-900 p-7 text-paper sm:p-9">
              <div
                className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-[radial-gradient(closest-side,rgb(201_138_134/0.25),transparent)]"
                aria-hidden
              />
              <p className="label flex items-center gap-3 text-blossom-300">
                <span className="h-px w-8 bg-blossom-300/60" aria-hidden /> Stay
                on the mountain
              </p>
              <p className="mt-4 font-display text-3xl leading-tight sm:text-4xl">
                Come home to a hot tub
                <em className="block text-blossom-300">in the trees.</em>
              </p>
              <p className="mt-4 max-w-md text-paper/75">
                Twelve cabins on {site.acres} wooded acres, with a private trail
                down to the river.
              </p>
              <Link
                href="/cabins"
                className="group mt-7 inline-flex items-center gap-3 rounded-full bg-paper py-2 pr-2 pl-6 text-sm font-semibold text-heather-900 transition hover:bg-blossom-100"
              >
                Find your cabin
                <span className="grid size-9 place-items-center rounded-full bg-heather-900 text-paper transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className="size-4" aria-hidden />
                </span>
              </Link>
            </aside>
          )}
        </article>
      </div>

      {/* Cabins picked for this post */}
      {stayCabins.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-10 lg:px-14 lg:pb-24">
          <p className="label flex items-center gap-3 text-sage-700">
            <span className="h-px w-8 bg-sage-500/60" aria-hidden /> Where to
            stay
          </p>
          <h2 className="mt-5 font-display text-4xl leading-[1.02] font-medium text-heather-900 sm:text-5xl">
            Stay where <em className="text-blossom-500">the story happens.</em>
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:max-w-5xl">
            {stayCabins.map((c) => (
              <CabinTile
                key={c.slug}
                cabin={c}
                fromPrice={prices[c.webrezId]}
              />
            ))}
          </div>
        </section>
      )}

      {/* More from the guide */}
      {related.length > 0 && (
        <section className="border-t border-vellum">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-10 lg:px-14 lg:py-24">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="label flex items-center gap-3 text-sage-700">
                  <span className="h-px w-8 bg-sage-500/60" aria-hidden /> Keep
                  reading
                </p>
                <h2 className="mt-5 font-display text-4xl leading-[1.02] font-medium text-heather-900 sm:text-5xl">
                  More from <em className="text-blossom-500">the guide.</em>
                </h2>
              </div>
              <Link
                href="/smoky-mountain-guide"
                className="inline-flex items-center gap-2 text-sm font-semibold text-heather-700 hover:text-heather-900"
              >
                All stories <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
