import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { GuidePost } from "@/data/guide";
import { formatPostDate, readMinutes } from "@/lib/guide";

const href = (p: GuidePost) => `/smoky-mountain-guide/${p.slug}`;

/** Category · date · read time, shared by both layouts. */
function Meta({ post }: { post: GuidePost }) {
  return (
    <p className="flex flex-wrap items-center gap-x-2 text-xs text-ink-600">
      <span className="label !text-[0.62rem] text-sage-700">{post.category}</span>
      <span aria-hidden>·</span>
      <time dateTime={post.date}>{formatPostDate(post.date)}</time>
      <span aria-hidden>·</span>
      <span>{readMinutes(post.body)} min read</span>
    </p>
  );
}

/**
 * Lead story on the guide index: a large photo with the text beside it on paper (editorial, not the
 * frosted photo tiles used for cabins), so the guide reads like a journal.
 */
export function FeaturedPost({ post }: { post: GuidePost }) {
  return (
    <article className="group grid overflow-hidden rounded-[1.75rem] border border-vellum bg-paper-deep/60 lg:grid-cols-[1.35fr_1fr]">
      <Link href={href(post)} tabIndex={-1} aria-hidden className="relative block aspect-[16/10] overflow-hidden bg-heather-950 lg:aspect-auto lg:min-h-[28rem]">
        <Image
          src={post.image.src}
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="object-cover transition duration-[1.6s] ease-out group-hover:scale-[1.04]"
        />
        <span className="absolute top-4 left-4 rounded-full border border-paper/25 bg-heather-950/45 px-3 py-1 text-xs font-medium text-paper backdrop-blur-md">Latest story</span>
      </Link>
      <div className="flex flex-col justify-center p-7 sm:p-10">
        <Meta post={post} />
        <h2 className="mt-4 font-display text-4xl leading-[1.08] font-medium text-balance text-heather-900 sm:text-[2.6rem]">
          <Link href={href(post)} className="transition hover:text-heather-700">
            {post.title}
          </Link>
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-ink-600">{post.excerpt}</p>
        <Link
          href={href(post)}
          className="group/btn mt-8 inline-flex items-center gap-3 self-start rounded-full bg-heather-900 py-2 pr-2 pl-6 text-sm font-semibold text-paper transition hover:bg-heather-700"
        >
          Read the story
          <span className="grid size-9 place-items-center rounded-full bg-paper text-heather-900 transition-transform group-hover/btn:translate-x-0.5">
            <ArrowRight className="size-4" aria-hidden />
          </span>
        </Link>
      </div>
    </article>
  );
}

/** Story card: photo on top, text below (same card style as Specials). */
export function PostCard({ post }: { post: GuidePost }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-vellum bg-paper-deep/60">
      <Link href={href(post)} tabIndex={-1} aria-hidden className="relative block aspect-[3/2] overflow-hidden bg-heather-950">
        <Image
          src={post.image.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-[1.6s] ease-out group-hover:scale-[1.05]"
        />
      </Link>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <Meta post={post} />
        <h3 className="mt-3 font-display text-2xl leading-snug font-medium text-balance text-heather-900">
          <Link href={href(post)} className="transition hover:text-heather-700">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-[0.95rem] leading-relaxed text-ink-600">{post.excerpt}</p>
        <Link href={href(post)} className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-heather-700 hover:text-heather-900">
          Read the story <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
