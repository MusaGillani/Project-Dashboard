"use client";

import { ThemeProvider } from "next-themes";

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
};
