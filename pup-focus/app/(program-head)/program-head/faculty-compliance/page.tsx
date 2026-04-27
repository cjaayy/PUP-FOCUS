import { AppShell } from "@/components/layout/app-shell";

export default function ProgramHeadCompliancePage() {
  return (
    <AppShell
      title="Faculty Compliance Monitoring"
      nav={[{ href: "/program-head/dashboard", label: "Dashboard" }]}
    >
      <div className="rounded-lg border border-slate-700 bg-slate-900 p-4 text-sm text-slate-300">
        Curriculum-based compliance matrix for all faculty appears here.
      </div>
    </AppShell>
  );
}
