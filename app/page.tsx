import Link from "next/link";
import { listWeddings } from "@/core/registry";

export default function EventsIndexPage() {
  const weddings = listWeddings();

  return (
    <main className="min-h-screen bg-[#f7f3ed] px-6 py-16 text-[#35312e]">
      <div className="mx-auto max-w-xl">
        <p className="text-[11px] uppercase tracking-[0.28em] text-[#77716c]">Wyvernstack</p>
        <h1 className="mt-3 text-4xl font-medium tracking-tight">Weddings</h1>
        <p className="mt-4 text-sm leading-7 text-[#35312e]/75">
          Invitations published under /events. This page does not replace the company site.
        </p>
        <ul className="mt-10 divide-y divide-[#35312e]/10 border-y border-[#35312e]/10">
          {weddings.map((wedding) => {
            const names =
              wedding.template === "template3"
                ? `${wedding.couple.firstName} & ${wedding.couple.secondName}`
                : `${wedding.couple.bride} & ${wedding.couple.groom}`;
            return (
              <li key={wedding.slug}>
                <Link href={`/${wedding.slug}/`} className="flex items-baseline justify-between gap-6 py-4">
                  <span>{names}</span>
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[#77716c]">{wedding.slug}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
