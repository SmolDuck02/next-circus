import { BackButton } from "@/components/ui/back-button";
import Balloon from "@/components/ui/balloon";
import InfoButton from "@/components/ui/info-button";

export default function Home() {
  const game = {
    name: "Balloon Inflation",
    description: "This propject is about handling tasks with time",
  };

  return (
    <main>
      <div> Hello Heilum!</div>
      <BackButton />
      <InfoButton gameDetails={game} />
      <Balloon />
    </main>
  );
}
