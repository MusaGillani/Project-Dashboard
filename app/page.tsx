import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Metadata } from "next";
import { redirect } from "next/navigation";

import { UserAuthForm } from "@/components/user-auth-form";

export const metadata: Metadata = {
  title: "Login",
  description: "User login",
};

export default async function AuthenticationPage() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    // Authenticated users will be redirected to the `/dash` route.
    redirect("/dash");
  }
  return (
    <div className="flex h-full min-h-screen flex-col justify-center bg-white dark:bg-black">
      <UserAuthForm />
    </div>
  );
}
