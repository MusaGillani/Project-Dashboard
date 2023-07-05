import { Metadata } from "next";
import { UserAuthForm } from "@/components/user-auth-form";

export const metadata: Metadata = {
  title: "Login",
  description: "User login",
};

export default function AuthenticationPage() {
  return (
    <div className="flex h-full min-h-screen flex-col justify-center bg-white dark:bg-black">
      <UserAuthForm />
    </div>
  );
}
