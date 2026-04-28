"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export function LogoutButton() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);

    const supabase = createClient();
    await supabase.auth.signOut();

    router.replace("/");
    router.refresh();
  }

  return (
    <Button
      type="button"
      variant="secondary"
      size="sm"
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="border border-[rgba(255,215,0,0.18)] bg-[#3d0000] text-[#fff8e7] hover:bg-[#5a0000]"
    >
      {isLoggingOut ? "Logging out..." : "Logout"}
    </Button>
  );
}
