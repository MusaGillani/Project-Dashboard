import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Metadata } from "next";
import { redirect } from "next/navigation";

import { Label } from "@/components/ui/label";
import { SignOut } from "@/components/signOutButton";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Application Dashboard",
};

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // This route can only be accessed by authenticated users.
    // Unauthenticated users will be redirected to the `/login` route.
    redirect("/");
  }

  return (
    <div className="h-full min-h-screen bg-white dark:bg-black">
      <div className="flex w-full justify-center px-5">
        <SignOut />
        <Label className="mt-8 py-2 text-2xl">Dashboard</Label>
      </div>
    </div>
  );
}
