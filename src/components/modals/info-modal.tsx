"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InfoIcon } from "lucide-react";

type GameDetails = {
  name: string;
  description: string;
};

export default function InfoModal({ gameDetails }: { gameDetails: GameDetails }) {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <InfoIcon className="absolute right-8 top-24 cursor-pointer" size={25}></InfoIcon>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Game Info</DialogTitle>
            <DialogDescription>This is description</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <h1 className="text-right">{gameDetails.name}</h1>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <p className="text-right">{gameDetails.description}</p>
            </div>
          </div>
          <DialogClose>
            <Button>Close</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
}
