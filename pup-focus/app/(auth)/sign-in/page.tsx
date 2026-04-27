"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    const supabase = createClient();
    const redirectTo = `${window.location.origin}/api/auth/callback`;

    const { error: signInError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo,
      },
    });

    if (signInError) {
      setError(signInError.message);
      setIsSubmitting(false);
      return;
    }

    setSuccess("Check your email for the sign-in link.");
    setIsSubmitting(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <section className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-900 p-6">
        <h1 className="text-2xl font-bold">Sign In</h1>
        <p className="mt-2 text-sm text-slate-400">
          Sign in with your institutional email. A one-time link will be sent to
          your inbox.
        </p>

        <form className="mt-6 space-y-3" onSubmit={onSubmit}>
          <label
            className="block text-sm font-medium text-slate-200"
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            placeholder="faculty@pup.edu.ph"
            className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none ring-amber-400/40 placeholder:text-slate-500 focus:ring"
          />

          {error ? <p className="text-sm text-red-400">{error}</p> : null}
          {success ? (
            <p className="text-sm text-emerald-400">{success}</p>
          ) : null}

          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending link..." : "Continue"}
          </Button>
        </form>
      </section>
    </main>
  );
}
