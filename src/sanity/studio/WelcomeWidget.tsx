"use client";

import { useClient } from "sanity";
import { useEffect, useRef, useState } from "react";
import { DashboardWidgetContainer } from "@sanity/dashboard";

interface ContentCounts {
  pages: number;
  submissions: number;
}

function WelcomeWidgetComponent() {
  const client = useClient({ apiVersion: "2024-01-01" });
  const clientRef = useRef(client);
  const [counts, setCounts] = useState<ContentCounts | null>(null);

  useEffect(() => {
    clientRef.current = client;
  });

  useEffect(() => {
    let cancelled = false;
    const c = clientRef.current;
    c.fetch(
      `{
          "pages": count(*[_type == "page"]),
          "submissions": count(*[_type == "formSubmission"])
        }`
    )
      .then((data) => {
        if (!cancelled) setCounts(data);
      })
      .catch(() => {
        if (!cancelled) setCounts(null);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <DashboardWidgetContainer header="Overview">
      <div style={{ padding: "1.25rem" }}>
        {counts ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
              gap: "1rem",
            }}
          >
            <StatCard label="Pages" count={counts.pages} />
            <StatCard label="Submissions" count={counts.submissions} />
          </div>
        ) : (
          <p style={{ margin: 0, opacity: 0.6 }}>Loading...</p>
        )}
      </div>
    </DashboardWidgetContainer>
  );
}

function StatCard({ label, count }: { label: string; count: number }) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "1rem",
        borderRadius: "6px",
        border: "1px solid var(--card-border-color)",
        background: "var(--card-bg-color)",
      }}
    >
      <div style={{ fontSize: "2rem", fontWeight: 700, lineHeight: 1 }}>{count}</div>
      <div style={{ fontSize: "0.8125rem", marginTop: "0.375rem", opacity: 0.7 }}>{label}</div>
    </div>
  );
}

export default function welcomeWidget() {
  return {
    name: "welcome",
    component: WelcomeWidgetComponent,
    layout: { width: "full" as const },
  };
}
