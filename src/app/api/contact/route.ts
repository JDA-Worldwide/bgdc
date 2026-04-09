import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "next-sanity";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-02-19",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

interface ContactBody {
  name: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  email: string;
  phone?: string;
  inquiryType?: string;
  message: string;
  newsletterOptIn?: boolean;
  recipientEmail?: string;
  sourcePage?: string;
  turnstileToken?: string;
}

export async function POST(request: Request) {
  try {
    const body: ContactBody = await request.json();
    const {
      name,
      company,
      email,
      phone,
      inquiryType,
      message,
      newsletterOptIn,
      recipientEmail,
      sourcePage,
      turnstileToken,
    } = body;

    // Turnstile verification (required when configured)
    if (process.env.TURNSTILE_SECRET_KEY) {
      if (!turnstileToken) {
        return NextResponse.json(
          { error: "Bot verification is required." },
          { status: 400 }
        );
      }
      const turnstileRes = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            secret: process.env.TURNSTILE_SECRET_KEY,
            response: turnstileToken,
          }),
        }
      );
      const turnstileData = await turnstileRes.json();
      if (!turnstileData.success) {
        return NextResponse.json(
          { error: "Bot verification failed. Please try again." },
          { status: 400 }
        );
      }
    }

    // Validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (name.length > 200 || email.length > 200 || message.length > 5000) {
      return NextResponse.json(
        { error: "One or more fields exceed the maximum length." },
        { status: 400 }
      );
    }

    // Send email via Resend
    if (process.env.RESEND_API_KEY) {
      const to = recipientEmail || process.env.CONTACT_FORM_RECIPIENT || "info@jdaworldwide.com";
      const from = process.env.CONTACT_FORM_SENDER || "noreply@jdaworldwide.com";

      await resend!.emails.send({
        from,
        to,
        subject: `New contact form submission from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          ${company ? `<p><strong>Company / Organization:</strong> ${escapeHtml(company)}</p>` : ""}
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
          ${inquiryType ? `<p><strong>Inquiry Type:</strong> ${escapeHtml(inquiryType)}</p>` : ""}
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
          ${newsletterOptIn ? `<p><strong>Newsletter Opt-In:</strong> Yes</p>` : ""}
          <hr>
          <p><small>Submitted from: ${escapeHtml(sourcePage || "Unknown")}</small></p>
        `,
      });
    }

    // Store in Sanity
    if (process.env.SANITY_API_TOKEN) {
      await sanityClient.create({
        _type: "formSubmission",
        name,
        email,
        message: [
          company ? `Company: ${company}` : null,
          phone ? `Phone: ${phone}` : null,
          inquiryType ? `Inquiry Type: ${inquiryType}` : null,
          message,
          newsletterOptIn ? "Newsletter Opt-In: Yes" : null,
        ]
          .filter(Boolean)
          .join("\n\n"),
        sourcePage: sourcePage || "",
        submittedAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
