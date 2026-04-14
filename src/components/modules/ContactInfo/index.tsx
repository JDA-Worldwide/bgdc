"use client";

import Container from "@/components/ui/Container";
import AnimateIn from "@/components/ui/AnimateIn";
import MapboxMapClient from "@/components/ui/MapboxMap/MapboxMapClient";
import type { ContactInfoProps } from "./types";

const OFFICE_LNG = -86.1617;
const OFFICE_LAT = 39.5534;

const OFFICE_MARKERS = [
  { lng: OFFICE_LNG, lat: OFFICE_LAT, label: "24 N Main St, Bargersville", isPrimary: true },
];

function PhoneIcon() {
  return (
    <svg className="h-5 w-5 shrink-0 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}

function FaxIcon() {
  return (
    <svg className="h-5 w-5 shrink-0 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg className="h-5 w-5 shrink-0 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg className="h-5 w-5 shrink-0 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg className="h-5 w-5 shrink-0 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="h-5 w-5 shrink-0 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

const socialIcons: Record<string, React.ReactNode> = {
  facebook: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
    </svg>
  ),
  instagram: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
    </svg>
  ),
  linkedin: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  twitter: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
};

const socialLabels: Record<string, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  twitter: "Twitter / X",
};

export default function ContactInfo({
  heading,
  body,
  phone,
  fax,
  email,
  website,
  address,
  hours,
  useGlobalSocialLinks = true,
  socialLinks,
  globalSocialLinks,
}: ContactInfoProps) {
  const hasDetails = phone || fax || email || website || address || hours;

  const activeSocialLinks: Array<{ _key?: string; platform: string; url: string }> =
    useGlobalSocialLinks && globalSocialLinks?.length
      ? globalSocialLinks
      : (socialLinks ?? []);

  return (
    <Container>
      <AnimateIn className="lg:grid lg:grid-cols-2 lg:gap-16">
        <div>
          {heading && (
            <h2 className="mb-4 font-heading text-2xl font-medium text-brand-text-heading sm:text-3xl md:text-[43px] md:leading-[60px]">
              {heading}
            </h2>
          )}
          {body && (
            <p className="mb-8 text-base leading-7 text-brand-charcoal">
              {body}
            </p>
          )}

          {hasDetails && (
            <ul className="space-y-4" aria-label="Contact details">
              {phone && (
                <li className="flex items-start gap-3">
                  <PhoneIcon />
                  <div>
                    <span className="block text-sm font-medium text-brand-muted">Phone</span>
                    <a
                      href={`tel:${phone.replace(/\D/g, "")}`}
                      className="text-brand-text hover:text-brand-secondary transition-colors"
                    >
                      {phone}
                    </a>
                  </div>
                </li>
              )}
              {fax && (
                <li className="flex items-start gap-3">
                  <FaxIcon />
                  <div>
                    <span className="block text-sm font-medium text-brand-muted">Fax</span>
                    <span className="text-brand-text">{fax}</span>
                  </div>
                </li>
              )}
              {email && (
                <li className="flex items-start gap-3">
                  <EmailIcon />
                  <div>
                    <span className="block text-sm font-medium text-brand-muted">Email</span>
                    <a
                      href={`mailto:${email}`}
                      className="text-brand-text hover:text-brand-secondary transition-colors"
                    >
                      {email}
                    </a>
                  </div>
                </li>
              )}
              {website && (
                <li className="flex items-start gap-3">
                  <GlobeIcon />
                  <div>
                    <span className="block text-sm font-medium text-brand-muted">Website</span>
                    <a
                      href={website.startsWith("http") ? website : `https://${website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-text hover:text-brand-secondary transition-colors"
                    >
                      {website}
                    </a>
                  </div>
                </li>
              )}
              {address && (
                <li className="flex items-start gap-3">
                  <MapPinIcon />
                  <div>
                    <span className="block text-sm font-medium text-brand-muted">Address</span>
                    <address className="not-italic text-brand-text whitespace-pre-line">
                      {address}
                    </address>
                  </div>
                </li>
              )}
              {hours && (
                <li className="flex items-start gap-3">
                  <ClockIcon />
                  <div>
                    <span className="block text-sm font-medium text-brand-muted">Hours</span>
                    <span className="text-brand-text">{hours}</span>
                  </div>
                </li>
              )}
            </ul>
          )}

          {activeSocialLinks.length > 0 && (
            <div className="mt-8">
              <p className="mb-3 text-sm font-medium text-brand-muted uppercase tracking-wider">
                Follow Along
              </p>
              <div className="flex gap-4">
                {activeSocialLinks.map((link, i) => (
                  <a
                    key={link._key ?? `${link.platform}-${i}`}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={socialLabels[link.platform] ?? link.platform}
                    className="flex h-10 w-10 items-center justify-center rounded bg-brand-surface text-brand-primary hover:bg-brand-primary hover:text-white transition-colors"
                  >
                    {socialIcons[link.platform]}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 lg:mt-0">
          <div className="h-80 w-full overflow-hidden rounded lg:h-full lg:min-h-[400px]">
            <MapboxMapClient
              center={[OFFICE_LNG, OFFICE_LAT]}
              zoom={11}
              markers={OFFICE_MARKERS}
              className="h-full w-full"
            />
          </div>
        </div>
      </AnimateIn>
    </Container>
  );
}
