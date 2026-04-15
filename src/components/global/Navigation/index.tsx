"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
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
  ctaLabel?: string;
  ctaUrl?: string;
}

/* ---------- Fallback data ---------- */

const fallbackItems: NavItem[] = [
  { label: "Who We Are", url: "/who-we-are" },
  { label: "Ongoing Growth", url: "/ongoing-growth" },
  { label: "Development Areas", url: "/development-areas" },
  { label: "Business Incentives", url: "/business-incentives" },
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

export default function Navigation({ items, ctaLabel = "Get in Touch", ctaUrl = "/get-in-touch" }: NavigationProps) {
  const resolvedItems = items?.length ? items : fallbackItems;

  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
    setOpenDropdown(null);
  }

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
    <header className="sticky top-0 z-50 bg-white">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-container items-center justify-between px-6 py-5 sm:px-10 lg:px-gutter"
      >
        {/* Brand / Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/images/logo.svg"
            alt="Bargersville Economic Development"
            width={309}
            height={63}
            className="h-10 sm:h-[63px]"
            style={{ width: "auto" }}
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-[49px] min-[1400px]:flex">
          <div className="flex items-center gap-10">
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
                        "flex items-center gap-1.5 text-base font-semibold leading-7 transition-colors hover:text-brand-soybean",
                        isActive(item.url) ? "text-brand-soybean" : "text-brand-blue"
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
                      <div className="absolute top-full left-0 mt-2 min-w-[220px] rounded-button border border-brand-border bg-white shadow-lg">
                        <div className="py-2">
                          <NavLink
                            href={item.url}
                            isExternal={item.isExternal}
                            className={cn(
                              "block px-5 py-2.5 text-[15px] font-medium transition-colors hover:bg-brand-surface hover:text-brand-soybean border-b border-brand-border",
                              isActive(item.url) ? "text-brand-soybean" : "text-brand-blue"
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
                                "block px-5 py-2.5 text-[15px] transition-colors hover:bg-brand-surface hover:text-brand-soybean",
                                isActive(child.url) ? "text-brand-soybean" : "text-brand-blue"
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
                    "text-base font-semibold leading-7 transition-colors hover:text-brand-soybean",
                    isActive(item.url) ? "text-brand-soybean" : "text-brand-blue"
                  )}
                >
                  {item.label}
                </NavLink>
              );
            })}
          </div>

          <Link
            href={ctaUrl}
            className="btn-blue-dark rounded-button px-5 py-[15px] text-base font-semibold leading-[21px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
          >
            {ctaLabel}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          ref={toggleRef}
          type="button"
          className="inline-flex items-center justify-center rounded p-3 text-brand-blue hover:text-brand-sun focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sun min-[1400px]:hidden"
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
          className="border-t border-brand-border bg-white min-[1400px]:hidden"
        >
          <div className="space-y-1 px-6 py-6">
            {resolvedItems.map((item) => {
              const hasChildren = item.children && item.children.length > 0;

              if (hasChildren) {
                return (
                  <div key={item.label}>
                    <button
                      type="button"
                      className={cn(
                        "flex w-full items-center justify-between rounded px-3 py-3 text-base font-semibold transition-colors hover:text-brand-soybean",
                        isActive(item.url) ? "text-brand-soybean" : "text-brand-blue"
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
                      <div className="ml-4 space-y-1 border-l border-brand-border pl-3 pb-2">
                        <NavLink
                          href={item.url}
                          isExternal={item.isExternal}
                          className={cn(
                            "block rounded px-3 py-2 text-[15px] transition-colors hover:text-brand-soybean",
                            isActive(item.url) ? "text-brand-soybean" : "text-brand-blue"
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
                              "block rounded px-3 py-2 text-[15px] transition-colors hover:text-brand-soybean",
                              isActive(child.url) ? "text-brand-soybean" : "text-brand-blue"
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
                    "block rounded px-3 py-3 text-base font-semibold transition-colors hover:text-brand-soybean",
                    isActive(item.url) ? "text-brand-soybean" : "text-brand-blue"
                  )}
                >
                  {item.label}
                </NavLink>
              );
            })}
            <Link
              href={ctaUrl}
              className="btn-blue-dark mt-4 block rounded-button px-5 py-4 text-center text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
