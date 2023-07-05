"use client";
import { useRouter } from "next/navigation";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const SignOut: React.FC = () => {
  const router = useRouter();
  const signOut: React.MouseEventHandler<HTMLButtonElement> = async () => {
    const supabase = createClientComponentClient();
    await supabase.auth.signOut();
    router.replace("/");
  };

  return (
    <Button
      onClick={signOut}
      className={cn(
        buttonVariants({ variant: "outline" }),
        "absolute right-16 top-4 text-black dark:text-white md:right-24 md:top-8"
      )}
    >
      Sign Out
    </Button>
  );
};
