import { cn } from "@/lib/utils";
import { stegaClean } from "@sanity/client/stega";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { PortableText, type PortableTextReactComponents } from "@portabletext/react";
import type { CTAProps } from "./types";

function bodyComponents(isPrimary: boolean): Partial<PortableTextReactComponents> {
  return {
    block: {
      normal: ({ children }) => (
        <p className={cn("mt-4 text-lg", isPrimary ? "text-white/90" : "text-brand-text")}>
          {children}
        </p>
      ),
    },
    marks: {
      strong: ({ children }) => <strong className="font-bold">{children}</strong>,
      em: ({ children }) => <em className="italic">{children}</em>,
      link: ({ children, value }) => (
        <a
          href={value?.href}
          target={value?.blank ? "_blank" : undefined}
          rel={value?.blank ? "noopener noreferrer" : undefined}
          className="underline hover:no-underline"
        >
          {children}
        </a>
      ),
    },
  };
}

const bgStyles = {
  default: "bg-brand-background",
  primary: "bg-brand-primary text-white",
  surface: "bg-brand-surface",
};

export default function CTA({
  heading,
  body,
  primaryButton,
  secondaryButton,
  backgroundColor = "default",
}: CTAProps) {
  const cleanBg = stegaClean(backgroundColor) ?? "default";
  const isPrimary = cleanBg === "primary";

  return (
    <div className={cn("py-section", bgStyles[cleanBg])}>
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <h2
            className={cn(
              "font-heading text-3xl font-bold sm:text-4xl",
              isPrimary ? "text-white" : "text-brand-text-heading"
            )}
          >
            {heading}
          </h2>

          {body?.length ? (
            <PortableText value={body} components={bodyComponents(isPrimary)} />
          ) : null}

          {(primaryButton?.label || secondaryButton?.label) && (
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              {primaryButton?.label && (
                <Button
                  href={primaryButton.url}
                  isExternal={primaryButton.isExternal}
                  variant={isPrimary ? "blue-light" : "blue-dark"}
                >
                  {primaryButton.label}
                </Button>
              )}
              {secondaryButton?.label && (
                <Button
                  href={secondaryButton.url}
                  isExternal={secondaryButton.isExternal}
                  variant={isPrimary ? "blue-light-outline" : "blue-dark-outline"}
                >
                  {secondaryButton.label}
                </Button>
              )}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
