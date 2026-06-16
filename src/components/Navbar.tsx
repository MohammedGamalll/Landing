"use client";

import Link from "next/link";
import Image from "next/image";

const links = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#testimonials", label: "Stories" },
];

export default function Navbar() {
  return (
    <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4">
      <nav className="flex w-full max-w-2xl items-center justify-between gap-4 rounded-full border border-white/10 bg-[#0a0908]/90 px-2.5 py-2 shadow-2xl shadow-black/40 backdrop-blur-md">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-full bg-brand px-3 py-1.5 font-display font-bold text-sm text-background"
        >
          <Image src="/logo.svg" alt="" width={16} height={16} className="h-4 w-4" />
          FitMind
        </Link>

        <div className="hidden items-center gap-6 text-sm text-white/70 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-white">
              {l.label}
            </a>
          ))}
        </div>

        <Link
          href="/demo"
          className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition-transform hover:scale-105"
        >
          Try the AI Coach
        </Link>
      </nav>
    </header>
  );
}
