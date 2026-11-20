import { Reveal } from "./Reveal";

type Props = {
  label: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
};

export function SectionHeading({ label, title, intro, align = "left", tone = "light" }: Props) {
  const center = align === "center";
  const dark = tone === "dark";
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className={`label ${dark ? "text-blossom-300" : "text-sage-700"} flex items-center gap-3 ${center ? "justify-center" : ""}`}>
        <span className={`h-px w-8 ${dark ? "bg-blossom-300/60" : "bg-sage-500/60"}`} aria-hidden />
        {label}
      </p>
      <h2 className={`mt-4 font-display text-4xl leading-[1.05] font-medium text-balance sm:text-5xl ${dark ? "text-paper" : "text-heather-900"}`}>{title}</h2>
      {intro && <p className={`mt-5 text-lg leading-relaxed text-pretty ${dark ? "text-paper/75" : "text-ink-600"}`}>{intro}</p>}
    </Reveal>
  );
}
