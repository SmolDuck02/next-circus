"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <Button variant="outline" className="fixed right-7 top-20 rounded-full h-8 w-8 opacity-70">
      <Sun
        onClick={() => setTheme("dark")}
        className="fixed h-[1.2rem] w-[1.2rem] rotate-0 scale-100 animate-spinOnce  transition-all   dark:-rotate-180 dark:scale-0 dark:animate-none "
      />
      <Moon
        onClick={() => setTheme("light")}
        className="fixed h-[1.2rem] w-[1.2rem] rotate-90 scale-0 animate-none transition-all dark:animate-spinOnce dark:rotate-0 dark:scale-100"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent align="end">
    //     <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
    //     <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
    //     <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
    //   </DropdownMenuContent>
    // </DropdownMenu>
  );
}
