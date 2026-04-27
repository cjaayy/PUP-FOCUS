import { AppShell } from "@/components/layout/app-shell";

export default function AdminDashboardPage() {
  return (
    <AppShell
      title="Super Admin Dashboard"
      subtitle="Platform governance, configuration, and audit visibility"
      nav={[
        { href: "/admin/users", label: "Users" },
        { href: "/admin/curriculum", label: "Curriculum" },
      ]}
    >
      <div className="grid gap-4 md:grid-cols-4">
        {[
          ["Users", "142"],
          ["Programs", "9"],
          ["Active Terms", "2"],
          ["Open Incidents", "0"],
        ].map(([label, value]) => (
          <article
            key={label}
            className="rounded-lg border border-slate-700 bg-slate-900 p-5"
          >
            <p className="text-sm text-slate-400">{label}</p>
            <p className="mt-2 text-2xl font-bold">{value}</p>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
