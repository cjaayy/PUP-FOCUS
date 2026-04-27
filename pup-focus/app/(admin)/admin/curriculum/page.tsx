import { AppShell } from "@/components/layout/app-shell";

export default function AdminCurriculumPage() {
  return (
    <AppShell
      title="Curriculum Management"
      nav={[{ href: "/admin/dashboard", label: "Dashboard" }]}
    >
      <div className="rounded-lg border border-slate-700 bg-slate-900 p-4 text-sm text-slate-300">
        Configure programs, curricula, subject mappings, and compliance template
        rules per course.
      </div>
    </AppShell>
  );
}
