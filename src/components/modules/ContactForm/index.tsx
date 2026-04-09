"use client";

import { useState, useRef, useCallback, useEffect, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import type { ContactFormProps } from "./types";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

interface FormState {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  inquiryType: string;
  message: string;
  newsletterOptIn: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  message?: string;
}

const inputClass = (error?: string) =>
  cn(
    "w-full rounded border px-4 py-3 text-brand-text outline-none transition-colors focus-visible:border-brand-secondary focus-visible:ring-1 focus-visible:ring-brand-secondary",
    error ? "border-red-500" : "border-brand-border"
  );

export default function ContactForm({
  heading,
  description,
  recipientEmail,
  successMessage = "Thank you! Your message has been sent.",
  inquiryTypes,
  showNewsletterOptIn = false,
}: ContactFormProps) {
  const [values, setValues] = useState<FormState>({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: "",
    newsletterOptIn: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const renderWidget = useCallback(() => {
    if (!siteKey || !turnstileRef.current || !window.turnstile) return;
    if (widgetIdRef.current) return;

    widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
      sitekey: siteKey,
      callback: (token: string) => setTurnstileToken(token),
      "expired-callback": () => setTurnstileToken(null),
      "error-callback": () => setTurnstileToken(null),
    });
  }, [siteKey]);

  useEffect(() => {
    if (!siteKey) return;

    if (window.turnstile) {
      renderWidget();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.onload = renderWidget;
    document.head.appendChild(script);

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [siteKey, renderWidget]);

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!values.firstName.trim()) errs.firstName = "First name is required";
    if (!values.lastName.trim()) errs.lastName = "Last name is required";
    if (!values.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      errs.email = "Please enter a valid email";
    if (!values.message.trim()) errs.message = "Message is required";
    return errs;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    if (siteKey && !turnstileToken) {
      setServerError("Please complete the verification challenge.");
      return;
    }

    setStatus("submitting");
    setServerError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${values.firstName} ${values.lastName}`,
          firstName: values.firstName,
          lastName: values.lastName,
          company: values.company,
          email: values.email,
          phone: values.phone,
          inquiryType: values.inquiryType,
          message: values.message,
          newsletterOptIn: values.newsletterOptIn,
          recipientEmail,
          turnstileToken,
          sourcePage: window.location.pathname,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setValues({
        firstName: "",
        lastName: "",
        company: "",
        email: "",
        phone: "",
        inquiryType: "",
        message: "",
        newsletterOptIn: false,
      });
      setTurnstileToken(null);
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current);
        setTurnstileToken(null);
      }
    }
  }

  function handleChange<K extends keyof FormState>(field: K, value: FormState[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (field in errors) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  return (
    <Container>
      <div className="mx-auto max-w-2xl">
        {heading && (
          <h2 className="mb-4 text-center font-heading text-3xl font-bold sm:text-4xl">
            {heading}
          </h2>
        )}
        {description && (
          <p className="mb-8 text-center text-brand-muted">{description}</p>
        )}

        {status === "success" ? (
          <div
            className="rounded bg-green-50 p-6 text-center text-green-800"
            role="alert"
            aria-live="polite"
          >
            <p className="font-semibold">{successMessage}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            {serverError && (
              <div
                className="mb-6 rounded bg-red-50 p-4 text-sm text-red-700"
                role="alert"
                aria-live="assertive"
              >
                {serverError}
              </div>
            )}

            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField id="contact-first-name" label="First Name" required error={errors.firstName}>
                  <input
                    id="contact-first-name"
                    type="text"
                    autoComplete="given-name"
                    value={values.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    aria-invalid={!!errors.firstName}
                    aria-describedby={errors.firstName ? "contact-first-name-error" : undefined}
                    className={inputClass(errors.firstName)}
                  />
                </FormField>

                <FormField id="contact-last-name" label="Last Name" required error={errors.lastName}>
                  <input
                    id="contact-last-name"
                    type="text"
                    autoComplete="family-name"
                    value={values.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    aria-invalid={!!errors.lastName}
                    aria-describedby={errors.lastName ? "contact-last-name-error" : undefined}
                    className={inputClass(errors.lastName)}
                  />
                </FormField>
              </div>

              <FormField id="contact-company" label="Company / Organization">
                <input
                  id="contact-company"
                  type="text"
                  autoComplete="organization"
                  value={values.company}
                  onChange={(e) => handleChange("company", e.target.value)}
                  className={inputClass()}
                />
              </FormField>

              <FormField id="contact-email" label="Email Address" required error={errors.email}>
                <input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "contact-email-error" : undefined}
                  className={inputClass(errors.email)}
                />
              </FormField>

              <FormField id="contact-phone" label="Phone Number">
                <input
                  id="contact-phone"
                  type="tel"
                  autoComplete="tel"
                  value={values.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className={inputClass()}
                />
              </FormField>

              {inquiryTypes && inquiryTypes.length > 0 && (
                <FormField id="contact-inquiry" label="How can we help you?">
                  <select
                    id="contact-inquiry"
                    value={values.inquiryType}
                    onChange={(e) => handleChange("inquiryType", e.target.value)}
                    className={inputClass()}
                  >
                    <option value="">Select one…</option>
                    {inquiryTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </FormField>
              )}

              <FormField id="contact-message" label="Tell us about your project or question" required error={errors.message}>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={values.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "contact-message-error" : undefined}
                  className={cn(inputClass(errors.message), "resize-y")}
                />
              </FormField>

              {showNewsletterOptIn && (
                <div className="flex items-start gap-3">
                  <input
                    id="contact-newsletter"
                    type="checkbox"
                    checked={values.newsletterOptIn}
                    onChange={(e) => handleChange("newsletterOptIn", e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-brand-border text-brand-secondary focus:ring-brand-secondary"
                  />
                  <label htmlFor="contact-newsletter" className="text-sm text-brand-muted">
                    I&apos;d like to receive updates from Bargersville Economic Development
                  </label>
                </div>
              )}

              {siteKey && (
                <div ref={turnstileRef} className="flex justify-center" />
              )}

              <Button
                type="submit"
                disabled={status === "submitting" || (!!siteKey && !turnstileToken)}
                aria-busy={status === "submitting"}
                aria-disabled={status === "submitting"}
                className="w-full"
              >
                {status === "submitting" ? "Sending…" : "Send Message"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </Container>
  );
}

function FormField({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-brand-text-heading">
        {label}
        {required && <span className="ml-1 text-red-500" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
