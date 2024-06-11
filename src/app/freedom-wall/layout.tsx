"use client";
import { BackButton } from "@/components/ui/back-button";
import { useTheme } from "next-themes";
import { useEffect } from "react";

export default function FreedomWallLayout({ children }: { children: React.ReactNode }) {
  const { setTheme } = useTheme();
  useEffect(() => {
    setTheme("light");
  }, []);
  return (
    <main className="bg-[#E6AB4B] h-screen w-screen">
      {children}
      <BackButton />
    </main>
  );
}
