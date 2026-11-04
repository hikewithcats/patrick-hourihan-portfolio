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
      <span className="label label-accent">Page not found</span>
      <h1 className="mt-4 text-5xl">Sorry, that page doesn&apos;t exist.</h1>
      <p className="mt-4 text-fg-dim">
        The link may be out of date. Everything you need is on the home page.
      </p>
      <Link
        href="/"
        className="btn btn-primary mt-8"
      >
        Return home
      </Link>
    </main>
  );
}
