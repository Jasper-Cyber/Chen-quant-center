"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

const nav = [
  { href: "/", label: "Home" },
  { href: "/research", label: "Research and Insights" },
  { href: "/market", label: "Market Data" },
  { href: "/quant-lab", label: "Quant Lab" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="container-cqc flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex min-w-0 flex-col">
          <span className="truncate font-serif text-lg font-bold text-ink">
            {site.shortName}
          </span>
          <span className="hidden truncate text-xs text-mist sm:block">
            {site.slogan}
          </span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition ${
                  active ? "text-accent" : "text-mist hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <details className="relative md:hidden">
          <summary className="cursor-pointer list-none rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium">
            Menu
          </summary>
          <div className="absolute right-0 mt-2 w-56 rounded-lg border border-slate-200 bg-white py-2 shadow-lg">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 text-sm text-ink hover:bg-slate-50"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </details>
      </div>
    </header>
  );
}
