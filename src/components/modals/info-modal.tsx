"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

interface GameDetail {
  name: string;
  description: string;
}

type GameKey = "/" | "/balloon-inflation" | "/rock-singers" | "/freedom-wall" | "/about";

type Game = Partial<{
  [key in GameKey]: GameDetail;
}>;

const gameDetails: Game = {
  "/": {
    name: "🎲 Dice",
    description: "It's Discor Time!",
  },
  "/balloon-inflation": {
    name: "Balloon Inflation",
    description: "This propject is about handling tasks with time",
  },
  "/rock-singers": {
    name: "Rock Singers",
    description: "This propject is about handling tasks with time",
  },
  "/freedom-wall": {
    name: "Wallin",
    description: "This propject is about handling tasks with time",
  },
};

export default function InfoModal() {
  const pathname = usePathname() as GameKey;
  console.log(pathname);
  return (
    <Dialog>
      {pathname != "/about" && (
        <>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="fixed h-8 w-8 text-lg right-[1.8rem] opacity-70  top-32 cursor-pointer rounded-full"
            >
              i
            </Button>
            {/* <InfoIcon className="absolute right-9 top-32 cursor-pointer" size={25}></InfoIcon> */}
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{gameDetails[pathname]?.name}</DialogTitle>
            </DialogHeader>
            <DialogDescription>{gameDetails[pathname]?.description}</DialogDescription>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
}
