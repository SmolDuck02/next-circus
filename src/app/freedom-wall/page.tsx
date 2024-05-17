import InfoModal from "@/components/modals/info-modal";
import { BackButton } from "@/components/ui/back-button";
import { Dialog } from "@/components/ui/dialog";

// DO NOT USE THIS PAGE, the index page only shows layout.tsx
export default function Home() {
  const game = { name: "", description: "" };
  return (
    <main>
      <div> Hello Constructive Critixisms!</div>
      <BackButton />
      <Dialog>
        <InfoModal gameDetails={game} />
      </Dialog>
    </main>
  );
}
