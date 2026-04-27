import Link from "next/link";

type NavigationItem = {
  href: string;
  label: string;
};

type AppShellProps = {
  title: string;
  subtitle?: string;
  nav: NavigationItem[];
  children: React.ReactNode;
};

export function AppShell({ title, subtitle, nav, children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/80">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-semibold">{title}</h1>
            {subtitle ? (
              <p className="text-sm text-slate-400">{subtitle}</p>
            ) : null}
          </div>
          <nav className="flex items-center gap-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md border border-slate-700 px-3 py-2 text-sm hover:bg-slate-800"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl px-6 py-8">{children}</main>
    </div>
  );
}
