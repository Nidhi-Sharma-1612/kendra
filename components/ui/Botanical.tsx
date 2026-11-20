import type { Motif } from "@/data/cabins";

/**
 * Pressed-flower line drawings, one motif per plant family. Drawn with currentColor so they take
 * the color of their context (heather on paper, paper on photos).
 */
export function Botanical({ motif, className = "", strokeWidth = 1.2 }: { motif: Motif; className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 64 96" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      {DRAWINGS[motif]}
    </svg>
  );
}

const leaf = (x: number, y: number, dir: 1 | -1, len = 14, tilt = -18) => (
  <g transform={`translate(${x} ${y}) rotate(${dir * tilt - (dir === -1 ? 180 : 0)})`}>
    <path d={`M0 0 C ${len * 0.35} -${len * 0.32} ${len * 0.75} -${len * 0.28} ${len} 0 C ${len * 0.75} ${len * 0.28} ${len * 0.35} ${len * 0.32} 0 0 Z`} />
    <path d={`M0 0 L ${len * 0.85} 0`} opacity="0.55" />
  </g>
);

const DRAWINGS: Record<Motif, React.ReactNode> = {
  // Carolina silverbell: an arching twig with hanging bells.
  bell: (
    <>
      <path d="M32 92 C31 70 30 52 34 38 C38 26 46 20 54 18" />
      {leaf(31, 66, -1)}
      {leaf(32, 54, 1)}
      {[[40, 27], [48, 21], [34, 36]].map(([x, y], i) => (
        <g key={i}>
          <path d={`M${x} ${y} L${x} ${y + 6}`} />
          <path d={`M${x - 4} ${y + 15} C${x - 4} ${y + 9} ${x - 2.5} ${y + 6} ${x} ${y + 6} C${x + 2.5} ${y + 6} ${x + 4} ${y + 9} ${x + 4} ${y + 15} C${x + 2} ${y + 13.5} ${x - 2} ${y + 13.5} ${x - 4} ${y + 15} Z`} />
        </g>
      ))}
    </>
  ),
  // Coneflower: a rayed head on a tall stem.
  ray: (
    <>
      <path d="M32 92 C32 72 31 50 32 32" />
      {leaf(32, 70, -1, 16)}
      {leaf(32, 58, 1, 15)}
      <circle cx="32" cy="22" r="4.5" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * 30 * Math.PI) / 180;
        return <path key={i} d={`M${32 + Math.cos(a) * 6.5} ${22 + Math.sin(a) * 6.5} L${32 + Math.cos(a) * 15} ${22 + Math.sin(a) * 15}`} />;
      })}
    </>
  ),
  // Five-petal bloom (rose, camellia, laurel, passionflower, forget-me-not).
  five: (
    <>
      <path d="M32 92 C33 74 31 52 32 36" />
      {leaf(32, 72, 1, 15)}
      {leaf(32, 60, -1, 15)}
      {leaf(32, 48, 1, 11)}
      <circle cx="32" cy="22" r="2.6" />
      {Array.from({ length: 5 }, (_, i) => (
        <path key={i} transform={`rotate(${i * 72} 32 22)`} d="M32 19 C27 15 27 7 32 6 C37 7 37 15 32 19 Z" />
      ))}
    </>
  ),
  // Berry sprig: leaves with a cluster of round fruit.
  berry: (
    <>
      <path d="M32 92 C32 76 33 60 31 44 C30 36 33 30 38 26" />
      {leaf(32, 74, -1, 15)}
      {leaf(32, 62, 1, 15)}
      {leaf(31, 48, -1, 13)}
      <path d="M38 26 L34 20 M38 26 L42 19 M38 26 L39 16" />
      <circle cx="33" cy="17" r="3.4" />
      <circle cx="43" cy="16" r="3.4" />
      <circle cx="38.5" cy="11" r="3.4" />
    </>
  ),
  // Mint: square stem with opposite leaf pairs and a flower cluster.
  sprig: (
    <>
      <path d="M32 92 L32 22" />
      {[78, 64, 50, 38].map((y, i) => (
        <g key={y}>
          {leaf(32, y, 1, 13 - i * 1.5, -28)}
          {leaf(32, y, -1, 13 - i * 1.5, -28)}
        </g>
      ))}
      {[[32, 16], [27, 19], [37, 19], [29, 13], [35, 13]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.2" />
      ))}
    </>
  ),
  // White pine: a twig with fanned bundles of five needles.
  needle: (
    <>
      <path d="M32 92 C32 74 32 56 32 30" />
      {[[32, 72, -1], [32, 56, 1], [32, 40, -1]].map(([x, y, d]) => (
        <g key={y}>
          {Array.from({ length: 5 }, (_, i) => {
            const a = ((d === 1 ? -70 : -110) + (i - 2) * 9) * (Math.PI / 180);
            return <path key={i} d={`M${x} ${y} L${x + Math.cos(a) * 22} ${y + Math.sin(a) * 22}`} />;
          })}
        </g>
      ))}
      {Array.from({ length: 5 }, (_, i) => {
        const a = (-90 + (i - 2) * 10) * (Math.PI / 180);
        return <path key={i} d={`M32 30 L${32 + Math.cos(a) * 22} ${30 + Math.sin(a) * 22}`} />;
      })}
    </>
  ),
  // Foxglove: a spire of tubular bells along one side.
  spike: (
    <>
      <path d="M32 92 L32 8" />
      {leaf(32, 82, -1, 18, -10)}
      {leaf(32, 78, 1, 17, -10)}
      {[66, 56, 46, 37, 29, 22, 16].map((y, i) => {
        const s = 1 - i * 0.09;
        return (
          <g key={y} transform={`translate(${i % 2 ? 32 : 32} ${y}) scale(${s})`}>
            <path d={`M0 0 C${i % 2 ? -3 : 3} 1 ${i % 2 ? -5 : 5} 3 ${i % 2 ? -6 : 6} 7 C${i % 2 ? -9 : 9} 9 ${i % 2 ? -12 : 12} 9 ${i % 2 ? -13 : 13} 6 C${i % 2 ? -12 : 12} 2 ${i % 2 ? -7 : 7} 0 0 0 Z`} />
          </g>
        );
      })}
    </>
  ),
};
