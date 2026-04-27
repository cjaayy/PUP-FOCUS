import { AppShell } from "@/components/layout/app-shell";

export default function FacultyHistoryPage() {
  return (
    <AppShell
      title="Submission History"
      nav={[{ href: "/faculty/dashboard", label: "Dashboard" }]}
    >
      <div className="rounded-lg border border-slate-700 bg-slate-900 p-4 text-sm text-slate-300">
        Historical submission versions and review trails appear here.
      </div>
    </AppShell>
  );
}
