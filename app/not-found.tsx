import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#f7f3ed] px-6 py-24 text-[#35312e]">
      <div className="mx-auto max-w-xl">
        <p className="text-[11px] uppercase tracking-[0.28em] text-[#77716c]">Wyvernstack Weddings</p>
        <h1 className="mt-3 text-4xl font-medium">This invitation was not found.</h1>
        <p className="mt-4 text-sm leading-7">The wedding slug is not registered.</p>
        <Link href="/" className="mt-8 inline-block text-sm underline">
          All weddings
        </Link>
      </div>
    </main>
  );
}
