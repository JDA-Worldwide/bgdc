"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

/* ---------- Types ---------- */

interface NavChild {
  label: string;
  url: string;
  isExternal?: boolean;
}

interface NavItem {
  label: string;
  url: string;
  isExternal?: boolean;
  children?: NavChild[];
}

interface NavigationProps {
  items?: NavItem[];
}

/* ---------- Fallback data (used when Sanity has no navigation document) ---------- */

const fallbackItems: NavItem[] = [
  { label: "Why Bargersville?", url: "/why-bargersville" },
  { label: "Available Land", url: "/available-land" },
  { label: "Incentives", url: "/incentives" },
  { label: "Resources", url: "/resources" },
  { label: "News", url: "/news" },
];

/* ---------- Link helper ---------- */

function NavLink({
  href,
  isExternal,
  className,
  children,
}: {
  href: string;
  isExternal?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

/* ---------- Component ---------- */

export default function Navigation({ items }: NavigationProps) {
  const resolvedItems = items?.length ? items : fallbackItems;

  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close menus on route change — setState during render (before commit) is the
  // React-recommended pattern for deriving state from changing props/values.
  // See: https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
    setOpenDropdown(null);
  }

  // Mobile menu: focus management + Escape to close
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

  // Desktop dropdown: close on outside click
  useEffect(() => {
    if (!openDropdown) return;

    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-dropdown]")) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [openDropdown]);

  // Desktop dropdown hover helpers (with small delay to prevent flicker)
  const handleDropdownEnter = useCallback((label: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setOpenDropdown(label);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  }, []);

  function isActive(url: string) {
    return pathname === url || pathname.startsWith(url + "/");
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.08] bg-brand-primary">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-[var(--container-content)] items-center justify-between px-6 lg:px-8 h-16"
      >
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
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

          <div className="h-7 w-px bg-white/25 hidden sm:block" />

          <div className="hidden sm:block uppercase leading-[11px] text-[11px]">
            <span className="block font-medium tracking-[1.54px] text-brand-steel">
              Bargersville
            </span>
            <span className="block font-semibold tracking-[1.76px] text-white mt-[3px]">
              Economic Development
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {resolvedItems.map((item) => {
            const hasChildren = item.children && item.children.length > 0;

            if (hasChildren) {
              return (
                <div
                  key={item.label}
                  className="relative"
                  data-dropdown
                  onMouseEnter={() => handleDropdownEnter(item.label)}
                  onMouseLeave={handleDropdownLeave}
                >
                  <button
                    type="button"
                    className={cn(
                      "flex items-center gap-1 px-3 py-2 text-[12.5px] uppercase tracking-[0.875px] transition-colors hover:text-white",
                      isActive(item.url) ? "text-white" : "text-white/70"
                    )}
                    aria-expanded={openDropdown === item.label}
                    aria-haspopup="true"
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === item.label ? null : item.label
                      )
                    }
                  >
                    {item.label}
                    <svg
                      className={cn(
                        "size-3 transition-transform",
                        openDropdown === item.label && "rotate-180"
                      )}
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 4.5L6 7.5L9 4.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {openDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-1 min-w-[200px] rounded-md border border-white/10 bg-brand-primary shadow-lg">
                      <div className="py-1">
                        {/* Parent link in dropdown */}
                        <NavLink
                          href={item.url}
                          isExternal={item.isExternal}
                          className={cn(
                            "block px-4 py-2.5 text-[12px] uppercase tracking-[0.7px] transition-colors hover:bg-white/10 hover:text-white border-b border-white/[0.06]",
                            isActive(item.url) ? "text-white" : "text-white/60"
                          )}
                        >
                          {item.label} Overview
                        </NavLink>
                        {item.children!.map((child) => (
                          <NavLink
                            key={child.url}
                            href={child.url}
                            isExternal={child.isExternal}
                            className={cn(
                              "block px-4 py-2.5 text-[12px] uppercase tracking-[0.7px] transition-colors hover:bg-white/10 hover:text-white",
                              isActive(child.url)
                                ? "text-white"
                                : "text-white/60"
                            )}
                          >
                            {child.label}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <NavLink
                key={item.url}
                href={item.url}
                isExternal={item.isExternal}
                className={cn(
                  "px-3 py-2 text-[12.5px] uppercase tracking-[0.875px] transition-colors hover:text-white",
                  isActive(item.url) ? "text-white" : "text-white/70"
                )}
              >
                {item.label}
              </NavLink>
            );
          })}
          <Link
            href="/contact"
            className="ml-4 inline-flex items-center justify-center rounded-[3px] bg-brand-secondary px-5 h-8 text-[12px] font-semibold uppercase tracking-[0.96px] text-brand-navy-dark transition-colors hover:bg-brand-secondary/90"
          >
            Contact
          </Link>
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
            {resolvedItems.map((item) => {
              const hasChildren = item.children && item.children.length > 0;

              if (hasChildren) {
                return (
                  <div key={item.label}>
                    <button
                      type="button"
                      className={cn(
                        "flex w-full items-center justify-between rounded px-3 py-3 text-sm font-medium uppercase tracking-wider transition-colors hover:bg-white/10",
                        isActive(item.url) ? "text-white" : "text-white/70"
                      )}
                      aria-expanded={openDropdown === item.label}
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === item.label ? null : item.label
                        )
                      }
                    >
                      {item.label}
                      <svg
                        className={cn(
                          "size-4 transition-transform",
                          openDropdown === item.label && "rotate-180"
                        )}
                        viewBox="0 0 12 12"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M3 4.5L6 7.5L9 4.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    {openDropdown === item.label && (
                      <div className="ml-4 space-y-1 border-l border-white/10 pl-3 pb-2">
                        <NavLink
                          href={item.url}
                          isExternal={item.isExternal}
                          className={cn(
                            "block rounded px-3 py-2 text-sm transition-colors hover:bg-white/10",
                            isActive(item.url) ? "text-white" : "text-white/60"
                          )}
                        >
                          Overview
                        </NavLink>
                        {item.children!.map((child) => (
                          <NavLink
                            key={child.url}
                            href={child.url}
                            isExternal={child.isExternal}
                            className={cn(
                              "block rounded px-3 py-2 text-sm transition-colors hover:bg-white/10",
                              isActive(child.url)
                                ? "text-white"
                                : "text-white/60"
                            )}
                          >
                            {child.label}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <NavLink
                  key={item.url}
                  href={item.url}
                  isExternal={item.isExternal}
                  className={cn(
                    "block rounded px-3 py-3 text-sm font-medium uppercase tracking-wider transition-colors hover:bg-white/10",
                    isActive(item.url) ? "text-white" : "text-white/70"
                  )}
                >
                  {item.label}
                </NavLink>
              );
            })}
            <Link
              href="/contact"
              className="block mt-2 text-center rounded-[3px] bg-brand-secondary px-5 py-3 text-sm font-semibold uppercase tracking-wider text-brand-navy-dark"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
