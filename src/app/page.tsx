"use client";
import Dice from "@/components/ui/dice";
import NavBar from "@/components/ui/nav-bar";
import { useTheme } from "next-themes";
import { useEffect } from "react";

// DO NOT USE THIS PAGE, the index page only shows layout.tsx
export default function Home() {
  const { setTheme } = useTheme();
  useEffect(() => {
    setTheme("dark");
  }, []);
  return (
    <main>
      <NavBar />
      <Dice />
      <div className="bg-[#185E91] blur-[15rem] -z-10 h-[15rem] w-[30rem] fixed -top-80 left-1/2 transform -translate-x-1/2"></div>

      <div className="bg-background blur-[2px]  -z-[5] h-32 w-full fixed  bottom-[10rem] "></div>

      <div className="bg-[#159eff] blur-[4rem] rounded-full -z-10 h-[2rem] w-[17rem] fixed bottom-[9rem] left-1/2 transform -translate-x-1/2"></div>
    </main>
  );
}
