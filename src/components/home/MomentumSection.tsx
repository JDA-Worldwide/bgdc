"use client";

import { cn } from "@/lib/utils";
import { useGsap } from "@/hooks/useGsap";
import { gsap } from "@/lib/gsap";
import CtaButtons from "@/components/ui/CtaButtons";
import type { CtaButtonItem } from "@/components/ui/CtaButtons";
import { PortableText } from "@portabletext/react";

interface Project {
  _key?: string;
  title: string;
  description: string;
  link?: { label?: string; url?: string; isExternal?: boolean };
}

interface MomentumSectionProps {
  heading?: string;
  body?: unknown[];
  projects?: Project[];
  ctas?: CtaButtonItem[];
}

const defaultProjects: Project[] = [
  {
    title: "Recreation Impact Fee Study 2021-2030",
    description:
      "The Town adopted a recreation impact fee ordinance in June 2017 after completing a year-long study. The impact fee will assist with future park and recreation infrastructure as residential growth continues.",
  },
  {
    title: "Parks and Recreation Master Plan 2023-2027",
    description:
      "The Parks and Recreation Board adopted the 2023-2027 Parks 5-Year Master Plan on February 9, 2024. The plan will guide the growth and development of the Town\u2019s Parks Department.",
  },
  {
    title: "Bargersville Vision 2040",
    description:
      "After nearly a year of public input and feedback, the Town of Bargersville adopted the Bargersville VISION 2040 Comprehensive Plan update. Visit the project\u2019s website to view and download the plan.",
  },
];

export default function MomentumSection({
  heading = "Momentum in Motion",
  body,
  projects,
  ctas,
}: MomentumSectionProps) {
  const resolvedProjects = projects?.length ? projects : defaultProjects;

  const sectionRef = useGsap<HTMLElement>((el) => {
    gsap.fromTo(
      el.querySelectorAll("[data-animate-fadeinup]"),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: { trigger: el, start: "top 80%" },
      }
    );
  });

  return (
    <section ref={sectionRef} className="bg-brand-sky py-section">
      <div className="mx-auto max-w-container px-6 sm:px-10 lg:px-gutter">
        <div data-animate-fadeinup className="mb-10 px-0 md:mb-[60px] lg:px-[109px]">
          {heading && (
            <h2 className="mb-10 text-3xl font-medium leading-tight text-brand-blue md:text-[43px] md:leading-[60px]">
              {heading}
            </h2>
          )}
          {body?.length ? (
            <PortableText
              value={body}
              components={{
                block: { normal: ({ children }) => <p className="text-base leading-7 text-brand-black">{children}</p> },
                marks: {
                  strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                  em: ({ children }) => <em className="italic">{children}</em>,
                  link: ({ children, value }) => (
                    <a href={value?.href} target={value?.blank ? "_blank" : undefined} rel={value?.blank ? "noopener noreferrer" : undefined} className="underline hover:no-underline">{children}</a>
                  ),
                },
              }}
            />
          ) : null}
        </div>

        <div className="mx-auto grid grid-cols-1 gap-10 px-0 sm:grid-cols-2 lg:grid-cols-3 lg:px-[111px]">
          {resolvedProjects.map((project, i) => {
            const count = resolvedProjects.length;
            // On tablet (sm/md): span the last card of an odd-count group full width.
            // On lg+ the grid switches to 3 cols so no spanning is needed.
            const spanTablet =
              count === 1 || (count % 3 === 0 && (i + 1) % 3 === 0);

            return (
              <div
                data-animate-fadeinup
                key={project._key ?? i}
                className={cn(
                  "flex flex-col gap-[30px] bg-white p-10",
                  spanTablet && "sm:col-span-2 lg:col-span-1"
                )}
              >
                <h3 className="text-[23px] font-medium leading-[30px] text-brand-blue">
                  {project.title}
                </h3>
                <hr className="border-brand-sky" />
                <p className="text-base leading-7 text-brand-blue">
                  {project.description}
                </p>
              </div>
            );
          })}
        </div>

        <CtaButtons ctas={ctas} className="mt-[60px] justify-center" />
      </div>
    </section>
  );
}
