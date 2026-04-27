import { AppShell } from "@/components/layout/app-shell";

export default function ProgramHeadReviewsPage() {
  return (
    <AppShell
      title="Review Queue"
      nav={[{ href: "/program-head/dashboard", label: "Dashboard" }]}
    >
      <div className="rounded-lg border border-slate-700 bg-slate-900 p-4 text-sm text-slate-300">
        Reviewer decisions, remarks, and return-for-revision actions are handled
        in this module.
      </div>
    </AppShell>
  );
}
