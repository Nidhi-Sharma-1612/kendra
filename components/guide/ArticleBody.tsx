import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { headingId } from "@/lib/guide";

function textOf(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (node && typeof node === "object" && "props" in node) return textOf((node as { props: { children?: React.ReactNode } }).props.children);
  return "";
}

const components: Components = {
  h2: ({ children }) => (
    <h2 id={headingId(textOf(children))} className="mt-14 mb-4 scroll-mt-28 font-display text-3xl leading-snug font-medium text-heather-900 sm:text-[2.1rem]">
      {children}
    </h2>
  ),
  h3: ({ children }) => <h3 className="mt-8 mb-3 font-display text-2xl leading-snug text-heather-900">{children}</h3>,
  p: ({ children }) => <p className="mb-5">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-heather-900">{children}</strong>,
  a: ({ href = "", children }) => {
    const cls = "font-semibold text-heather-700 underline decoration-blossom-500/50 underline-offset-[3px] hover:decoration-blossom-500";
    return href.startsWith("/") ? (
      <Link href={href} className={cls}>
        {children}
      </Link>
    ) : (
      <a href={href} target="_blank" rel="noopener" className={cls}>
        {children}
      </a>
    );
  },
  ul: ({ children }) => <ul className="my-7 space-y-3 border-l-2 border-blossom-300/60 pl-6">{children}</ul>,
  ol: ({ children }) => <ol className="my-7 list-decimal space-y-3 pl-5 marker:font-semibold marker:text-blossom-500">{children}</ol>,
  li: ({ children }) => <li className="pl-1">{children}</li>,
};

/** A guide post's Markdown body with the site's article typography. */
export function ArticleBody({ markdown }: { markdown: string }) {
  return (
    <div className="text-[1.075rem] leading-[1.8] text-ink-600 [&>p:first-child]:font-display [&>p:first-child]:text-[1.45rem] [&>p:first-child]:leading-relaxed [&>p:first-child]:text-heather-900">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
