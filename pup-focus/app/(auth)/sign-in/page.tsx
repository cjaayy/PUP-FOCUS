import { Button } from "@/components/ui/button";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <section className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-900 p-6">
        <h1 className="text-2xl font-bold">Sign In</h1>
        <p className="mt-2 text-sm text-slate-400">
          Supabase authentication wiring is prepared. Connect your auth provider
          and redirect rules.
        </p>
        <Button className="mt-6 w-full">Continue</Button>
      </section>
    </main>
  );
}
