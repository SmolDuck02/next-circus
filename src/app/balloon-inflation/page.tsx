import InfoModal from "@/components/modals/info-modal";
import { BackButton } from "@/components/ui/back-button";
import Balloon from "@/components/ui/balloon";

export default function Home() {
  const game = {
    name: "Balloon Inflation",
    description: "This propject is about handling tasks with time",
  };

  return (
    <main>
      <div> Hello Heilum!</div>
      <BackButton />
      <InfoModal gameDetails={game} />
      <Balloon />
    </main>
  );
}
