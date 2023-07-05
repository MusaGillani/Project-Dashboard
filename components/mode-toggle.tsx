"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (resolvedTheme === "dark") setTheme("light");
    if (resolvedTheme === "light") setTheme("dark");
  };
  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} className={cn('absolute right-4 top-4 md:right-8 md:top-8')}>
      <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
