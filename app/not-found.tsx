import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-32">
      <p className="font-mono text-xs uppercase tracking-wide text-ink-muted">
        404
      </p>
      <h1 className="mt-3 font-serif text-4xl text-ink">Page not found</h1>
      <p className="mt-4 text-ink-muted">
        That page doesn&apos;t exist. Head back to the{" "}
        <Link href="/" className="text-accent hover:underline">
          home page
        </Link>{" "}
        or browse{" "}
        <Link href="/solutions" className="text-accent hover:underline">
          solutions
        </Link>
        .
      </p>
    </div>
  );
}
