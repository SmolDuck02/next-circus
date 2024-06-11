"use client";

import { BackButton } from "@/components/ui/back-button";
import { useTheme } from "next-themes";
import { useEffect } from "react";

export default function BalloonLayout({ children }: { children: React.ReactNode }) {
  const { setTheme } = useTheme();
  useEffect(() => {
    setTheme("light");
  }, []);
  return (
    <section className=" h-screen w-screen bg-[#DAD7CD]">
      {children}
      <BackButton />
    </section>
  );
}
