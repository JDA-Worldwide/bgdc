"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";
import PortableText from "@/components/ui/PortableText";
import { useGsap } from "@/hooks/useGsap";
import { gsap } from "@/lib/gsap";
import type { FAQProps, FAQItem } from "./types";

export default function FAQ({ heading, items }: FAQProps) {
  const ref = useGsap<HTMLDivElement>((el) => {
    gsap.fromTo(
      el.querySelectorAll("[data-faq-animate]"),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: "power2.out",
        stagger: 0.07,
        scrollTrigger: { trigger: el, start: "top 85%" },
      }
    );
  });

  if (!items?.length) return null;

  return (
    <Container>
      <div ref={ref} className="mx-auto max-w-3xl">
        {heading && (
          <h2 data-faq-animate className="mb-10 text-center font-heading text-3xl font-bold sm:text-4xl">
            {heading}
          </h2>
        )}

        <dl className="divide-y divide-brand-border">
          {items.map((item) => (
            <div key={item._key} data-faq-animate>
              <AccordionItem item={item} />
            </div>
          ))}
        </dl>
      </div>
    </Container>
  );
}

function AccordionItem({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false);
  const panelId = `faq-panel-${item._key}`;
  const triggerId = `faq-trigger-${item._key}`;

  return (
    <div>
      <dt>
        <button
          type="button"
          id={triggerId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-between py-5 text-left"
        >
          <span className="font-heading text-lg font-semibold text-brand-text-heading">
            {item.question}
          </span>
          <svg
            className={cn(
              "ml-4 h-5 w-5 shrink-0 text-brand-muted transition-transform duration-200",
              open && "rotate-180"
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </dt>
      <dd
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className={cn(
          "overflow-hidden transition-all duration-200",
          open ? "max-h-[1000px] pb-5 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <PortableText value={item.answer} />
      </dd>
    </div>
  );
}
