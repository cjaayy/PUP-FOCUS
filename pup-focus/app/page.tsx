import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6 py-16 text-slate-100">
      <div className="mx-auto w-full max-w-5xl rounded-2xl border border-slate-700 bg-slate-900/60 p-8 shadow-2xl">
        <p className="text-sm uppercase tracking-[0.22em] text-amber-300">
          Polytechnic University of the Philippines - Bataan Campus
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">PUP FOCUS</h1>
        <p className="mt-4 max-w-3xl text-slate-300">
          Faculty Online Compliance and Uploading System for Efficient Academic
          Document Management.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/faculty/dashboard"
            className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 font-medium hover:bg-slate-700"
          >
            Faculty Portal
          </Link>
          <Link
            href="/program-head/dashboard"
            className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 font-medium hover:bg-slate-700"
          >
            Program Head Portal
          </Link>
          <Link
            href="/admin/dashboard"
            className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 font-medium hover:bg-slate-700"
          >
            Admin Console
          </Link>
          <Link
            href="/sign-in"
            className="rounded-lg border border-amber-500 bg-amber-500/10 px-4 py-3 font-medium text-amber-200 hover:bg-amber-500/20"
          >
            Sign In
          </Link>
        </div>
        <div className="mt-8 rounded-lg border border-slate-700 bg-slate-800/70 p-4 text-sm text-slate-300">
          Project status: enterprise baseline scaffolded with feature modules,
          Supabase schema plan, upload architecture, CI/CD workflows, and test
          harness.
        </div>
      </div>
    </main>
  );
}
