"use client";

import { cn } from "@/lib/utils";
import { useGsap } from "@/hooks/useGsap";
import { gsap } from "@/lib/gsap";

interface Project {
  title: string;
  description: string;
  link?: { label: string; url: string; isExternal?: boolean };
}

interface MomentumSectionProps {
  heading?: string;
  body?: string;
  projects?: Project[];
  cta?: { label: string; url: string; isExternal?: boolean };
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
  body = "From a transformative downtown redevelopment plan to new residential communities and mixed-use commercial development along SR 135, Bargersville is actively building its future\u2014one intentional project at a time. There has never been a better time to be part of what\u2019s growing here.",
  projects,
  cta = { label: "See Current Projects", url: "#projects" },
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
          {body && (
            <p className="text-base leading-7 text-brand-black">{body}</p>
          )}
        </div>

        <div className="mx-auto grid grid-cols-1 gap-10 px-0 sm:grid-cols-2 lg:px-[111px]">
          {resolvedProjects.map((project, i) => {
            // Determine col-span for this card based on total count
            const count = resolvedProjects.length;
            let spanFull = false;

            if (count === 1) {
              // Single card always spans both columns
              spanFull = true;
            } else if (count % 3 === 0) {
              // Groups of 3: every 3rd card (index 2, 5, 8…) spans full width
              spanFull = (i + 1) % 3 === 0;
            }
            // count % 2 === 0 (or other): plain 2-col, no spanning

            return (
              <div
                data-animate-fadeinup
                key={project.title}
                className={cn("flex flex-col gap-[30px] bg-white p-10", spanFull && "sm:col-span-2")}
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

        {cta?.url && (
          <div className="mt-[60px] flex justify-center">
            <a
              href={cta.url}
              target={cta.isExternal ? "_blank" : undefined}
              rel={cta.isExternal ? "noopener noreferrer" : undefined}
              className="rounded-button bg-brand-blue px-5 py-[15px] text-base font-semibold leading-[21px] text-white transition-colors hover:bg-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 active:bg-brand-blue/90"
            >
              {cta.label}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
