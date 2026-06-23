import Link from "next/link";

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main
      id="main"
      className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-start justify-center px-[var(--spacing-gutter)]"
    >
      <span className="label label-ember">Error 404 · off the trail</span>
      <h1 className="mt-4 text-5xl">This page isn&apos;t on the map.</h1>
      <p className="mt-4 text-cream-dim">
        The coordinates you followed don&apos;t lead anywhere. Let&apos;s get you
        back to solid ground.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-ember px-5 py-2.5 text-sm font-semibold text-[#180d05]"
      >
        Return home
      </Link>
    </main>
  );
}
