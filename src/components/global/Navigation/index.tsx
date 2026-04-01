"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Why Bargersville?", href: "/why-bargersville" },
  { label: "Available Land", href: "/available-land" },
  { label: "Incentives", href: "/incentives" },
  { label: "Resources", href: "/resources" },
  { label: "News", href: "/news" },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;

    const firstLink =
      mobileMenuRef.current?.querySelector<HTMLElement>("a, button");
    firstLink?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMobileOpen(false);
        toggleRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.08] bg-brand-primary">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-[var(--container-content)] items-center justify-between px-6 lg:px-8 h-16"
      >
        {/* Brand */}
        <a href="/" className="flex items-center gap-3 shrink-0">
          {/* Logo mark */}
          <div className="flex items-center justify-center size-9">
            <svg
              className="size-8"
              viewBox="0 0 32 32"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="16" cy="16" r="14" stroke="#B7C7D3" strokeWidth="1.5" />
              <circle cx="16" cy="16" r="6" fill="#FFBF3C" />
              <path d="M16 2v28M2 16h28" stroke="#B7C7D3" strokeWidth="0.5" opacity="0.4" />
            </svg>
          </div>

          {/* Divider */}
          <div className="h-7 w-px bg-white/25 hidden sm:block" />

          {/* Wordmark */}
          <div className="hidden sm:block uppercase leading-[11px] text-[11px]">
            <span className="block font-medium tracking-[1.54px] text-brand-steel">
              Bargersville
            </span>
            <span className="block font-semibold tracking-[1.76px] text-white mt-[3px]">
              Economic Development
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-2 text-[12.5px] uppercase tracking-[0.875px] transition-colors hover:text-white",
                pathname === link.href
                  ? "text-white"
                  : "text-white/70"
              )}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/contact"
            className="ml-4 inline-flex items-center justify-center rounded-[3px] bg-brand-secondary px-5 h-8 text-[12px] font-semibold uppercase tracking-[0.96px] text-brand-navy-dark transition-colors hover:bg-brand-secondary/90"
          >
            Contact
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          ref={toggleRef}
          type="button"
          className="inline-flex items-center justify-center rounded p-2 text-white/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          ref={mobileMenuRef}
          className="border-t border-white/[0.08] bg-brand-primary lg:hidden"
        >
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "block rounded px-3 py-3 text-sm font-medium uppercase tracking-wider transition-colors hover:bg-white/10",
                  pathname === link.href
                    ? "text-white"
                    : "text-white/70"
                )}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/contact"
              className="block mt-2 text-center rounded-[3px] bg-brand-secondary px-5 py-3 text-sm font-semibold uppercase tracking-wider text-brand-navy-dark"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
