import { AppShell } from "@/components/layout/app-shell";

export default function FacultyDashboardPage() {
  return (
    <AppShell
      title="Faculty Dashboard"
      subtitle="Track curriculum-based compliance requirements and deadlines"
      nav={[
        { href: "/faculty/compliance", label: "Compliance" },
        { href: "/faculty/history", label: "History" },
      ]}
    >
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["Required Documents", "24"],
          ["Submitted", "16"],
          ["Pending Review", "5"],
        ].map(([label, value]) => (
          <article
            key={label}
            className="rounded-lg border border-slate-700 bg-slate-900 p-5"
          >
            <p className="text-sm text-slate-400">{label}</p>
            <p className="mt-2 text-3xl font-bold">{value}</p>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
