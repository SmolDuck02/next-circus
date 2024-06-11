"use client";

import { BackButton } from "@/components/ui/back-button";
import { useTheme } from "next-themes";
import { useEffect } from "react";

export default function RockSingersLayout({ children }: { children: React.ReactNode }) {
  const { setTheme } = useTheme();
  useEffect(() => {
    setTheme("light");
  }, []);
  return (
    <section className=" h-screen w-screen bg-[#306452] flex flex-col justify-center items-center ">
      {children}
      <BackButton />
    </section>
  );
}
