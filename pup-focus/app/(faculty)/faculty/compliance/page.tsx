import { AppShell } from "@/components/layout/app-shell";
import { DEFAULT_REQUIREMENTS } from "@/config/compliance";

export default function FacultyCompliancePage() {
  return (
    <AppShell
      title="Compliance Checklist"
      subtitle="Requirement visibility is generated from curriculum and teaching load"
      nav={[{ href: "/faculty/dashboard", label: "Dashboard" }]}
    >
      <div className="space-y-3">
        {DEFAULT_REQUIREMENTS.map((item) => (
          <article
            key={item}
            className="rounded-lg border border-slate-700 bg-slate-900 p-4"
          >
            <p className="font-medium">{item}</p>
            <p className="text-sm text-slate-400">Status: not_started</p>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
