/* Plain <img> is correct here: this is a static export with pre-optimized assets. */
/* eslint-disable @next/next/no-img-element */

/** A real site screenshot inside a simple browser window. */
export function BrowserFrame({
  src,
  alt,
  domain,
  eager = false,
  className = "",
}: {
  src: string;
  alt: string;
  domain: string;
  eager?: boolean;
  className?: string;
}) {
  return (
    <figure
      className={`overflow-hidden rounded-xl border border-line bg-surface shadow-[0_18px_45px_-28px_rgba(27,36,31,0.55)] ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-line-soft bg-surface px-3 py-2" aria-hidden="true">
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="ml-2 truncate rounded-full bg-bg-2 px-2.5 py-0.5 text-[0.6875rem] leading-4 text-fg-faint">
          {domain}
        </span>
      </div>
      <img
        src={src}
        alt={alt}
        width={1280}
        height={800}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className="aspect-[16/10] w-full object-cover object-top"
      />
    </figure>
  );
}

/** A real mobile screenshot inside a simple phone outline. */
export function PhoneFrame({
  src,
  alt,
  eager = false,
  className = "",
}: {
  src: string;
  alt: string;
  eager?: boolean;
  className?: string;
}) {
  return (
    <figure
      className={`overflow-hidden rounded-[1.1rem] border-[3px] border-fg bg-fg shadow-[0_18px_40px_-18px_rgba(27,36,31,0.7)] ${className}`}
    >
      <img
        src={src}
        alt={alt}
        width={462}
        height={1000}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className="block aspect-[390/844] w-full rounded-[0.85rem] object-cover object-top"
      />
    </figure>
  );
}
