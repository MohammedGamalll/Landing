import Link from "next/link";
import Image from "next/image";
import { AtSign, MessageCircle, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-10 border-t border-border px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <Link href="/" className="flex items-center gap-2 font-display font-bold">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand">
            <Image src="/logo.svg" alt="" width={18} height={18} />
          </span>
          FitMind
        </Link>

        <p className="text-sm text-muted">
          © {new Date().getFullYear()} FitMind. Built with care, coached by AI.
        </p>

        <div className="flex items-center gap-4 text-muted">
          <a href="#" aria-label="Instagram" className="hover:text-brand transition-colors">
            <AtSign size={18} />
          </a>
          <a href="#" aria-label="Community" className="hover:text-brand transition-colors">
            <MessageCircle size={18} />
          </a>
          <a href="#" aria-label="Website" className="hover:text-brand transition-colors">
            <Globe size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
