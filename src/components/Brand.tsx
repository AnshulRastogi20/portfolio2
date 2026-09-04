import { useTheme } from "./ThemeProvider";

/**
 * The Sight of Anshul marks.
 *
 * Three constraints from Assets/brand/sightofanshul/BRAND-BRIEF.md §10, all of
 * which this file exists to enforce so no caller has to remember them:
 *
 *  1. Everything here is raster, and the wordmark's letterforms are an image
 *     model's imitation of Clash Display, not the real font. It must never be
 *     scaled up past its source width and never recoloured. `Wordmark` caps
 *     its own width for that reason. A vector rebuild is an open task.
 *  2. The wordmark is a single dark ink, so it vanishes on dark. `Wordmark`
 *     swaps to the reversed export on plate. The symbol and the eye hold on
 *     both surfaces and need no variant.
 *  3. The lit eye (amber outline, white interior, black pupil, white
 *     catchlight) is the personal-brand eye. It is not the flat AI Sight
 *     favicon eye. Different marks, different things.
 */

type MarkProps = { className?: string; alt?: string };

/**
 * The two-line lockup, the lit eye standing in for the O of OF. Primary mark -
 * use it anywhere the name should be read at size.
 *
 * `maxWidth: 512px` is the source width of the export it loads. Past that the
 * raster letterforms fringe.
 */
export const Wordmark = ({ className = "", alt = "Sight of Anshul" }: MarkProps) => {
  const { theme } = useTheme();
  const src = theme === "dark"
    ? "/brand/soa-wordmark-reversed-512.png"
    : "/brand/soa-wordmark-512.png";
  return (
    <img
      src={src}
      alt={alt}
      width={512}
      height={191}
      decoding="async"
      className={`w-full h-auto ${className}`}
      style={{ maxWidth: 512 }}
    />
  );
};

/** Circular SOA badge. Reads as a white disc, so it holds on either surface. */
export const SymbolMark = ({ className = "", alt = "Sight of Anshul" }: MarkProps) => (
  <img
    src="/brand/soa-symbol-256.png"
    alt={alt}
    width={256}
    height={256}
    decoding="async"
    className={className}
  />
);

/** The bare lit eye. Favicon, video bug, bullet, pattern element. */
export const EyeMark = ({ className = "", alt = "" }: MarkProps) => (
  <img
    src="/brand/soa-eye-128.png"
    alt={alt}
    aria-hidden={alt === "" || undefined}
    width={128}
    height={89}
    decoding="async"
    className={className}
  />
);

/**
 * Horizontal lockup for small chrome - the nav bar, mostly.
 *
 * Deliberately not the wordmark PNG: at nav height the raster lockup is either
 * illegible or upscaled, and it is two lines when it needs to be one. The eye
 * is the real mark, and the name beside it is set in actual Clash Display,
 * which is what `lockup-ref.html` in the brand folder specifies anyway.
 */
export const Lockup = ({ className = "" }: { className?: string }) => (
  <span className={`inline-flex items-center gap-2.5 ${className}`}>
    <EyeMark className="h-5 w-auto shrink-0" />
    <span className="font-display font-semibold tracking-tight leading-none">
      <span className="text-foreground/60 text-[0.7em] uppercase tracking-[0.18em] mr-1.5">
        Sight of
      </span>
      <span className="text-foreground">Anshul</span>
    </span>
  </span>
);
