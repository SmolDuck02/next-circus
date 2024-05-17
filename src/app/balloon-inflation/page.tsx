"use client";

import InfoModal from "@/components/modals/info-modal";
import { BackButton } from "@/components/ui/back-button";
import Balloon from "@/components/ui/balloon";

export default function BalloonInflation() {
  const game = {
    name: "Balloon Inflation",
    description: "This propject is about handling tasks with time",
  };

  return (
    <main>
      <div> Hello Heilum!</div>
      <InfoModal gameDetails={game} />

      <Balloon />
      <BackButton />
    </main>
  );
}
