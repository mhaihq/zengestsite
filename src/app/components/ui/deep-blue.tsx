// The deep blue used by the "Dentro ZenGest" panel, shared so other homepage
// sections can pick it up again and the page reads as one piece.

export const DEEP_BLUE = "linear-gradient(160deg, #00122F 0%, #0B3B4F 55%, #0D9488 100%)";
// Same family, a touch deeper at the far end: for long sections with white cards or a photo on top.
const DEEP_BLUE_CALM = "linear-gradient(160deg, #00122F 0%, #0A2F4B 58%, #0F6B73 100%)";
const DEEP_BLUE_CALM_FLIP = "linear-gradient(200deg, #00122F 0%, #0A2F4B 58%, #0F6B73 100%)";

/** A section that changes colour slides over the previous one with a rounded top edge. */
export const SHEET = "relative -mt-8 md:-mt-11 rounded-t-[28px] md:rounded-t-[44px]";

/** Pill label for dark sections (the teal pill disappears on the teal end of the gradient). */
export const DARK_PILL =
  "inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white font-['DM_Sans']";

const GRAIN_SVG = encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>",
);
const CSS = `
.zg-grain::after{content:"";position:absolute;inset:0;opacity:.07;background-image:url("data:image/svg+xml,${GRAIN_SVG}")}
`;

/**
 * Gradient + grain behind a section. The section needs `relative isolate overflow-hidden`.
 */
export function DeepBlueBackdrop({ flip = false }: { flip?: boolean }) {
  return (
    <>
      <style>{CSS}</style>
      <div aria-hidden="true" className="absolute inset-0 -z-10" style={{ background: flip ? DEEP_BLUE_CALM_FLIP : DEEP_BLUE_CALM }} />
      <div aria-hidden="true" className="zg-grain absolute inset-0 -z-10" />
    </>
  );
}
