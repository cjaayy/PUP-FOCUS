import { AppShell } from "@/components/layout/app-shell";

export default function AdminUsersPage() {
  return (
    <AppShell
      title="User Management"
      nav={[{ href: "/admin/dashboard", label: "Dashboard" }]}
    >
      <div className="rounded-lg border border-slate-700 bg-slate-900 p-4 text-sm text-slate-300">
        Manage faculty, program heads, and admin accounts with RBAC assignments.
      </div>
    </AppShell>
  );
}
