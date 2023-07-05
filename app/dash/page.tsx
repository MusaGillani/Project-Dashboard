import { ModeToggle } from "@/components/mode-toggle";
import { Label } from "@/components/ui/label";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Application Dashboard",
};

export default function AuthenticationPage() {
  return (
    <div className="h-full min-h-screen bg-white dark:bg-black">
      <div className="px-5 flex justify-center w-full">
        <Label className="text-2xl mt-8 py-2">Dashboard</Label>
      </div>
    </div>
  );
}
