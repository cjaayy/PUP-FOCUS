import { AppShell } from "@/components/layout/app-shell";

export default function ProgramHeadDashboardPage() {
  return (
    <AppShell
      title="Program Head Dashboard"
      subtitle="Review faculty compliance status across assigned programs"
      nav={[
        { href: "/program-head/reviews", label: "Review Queue" },
        { href: "/program-head/faculty-compliance", label: "Compliance" },
      ]}
    >
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["Pending Review", "31"],
          ["Compliant Faculty", "18"],
          ["Overdue Requirements", "12"],
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
