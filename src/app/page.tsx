import InfoModal from "@/components/modals/info-modal";
import Dice from "@/components/ui/dice";
import NavBar from "@/components/ui/nav-bar";

// DO NOT USE THIS PAGE, the index page only shows layout.tsx
export default function Home() {
  const game = {
    name: "Dicee",
    description: "It's Discor Time!",
  };

  return (
    <main>
      <NavBar />
      <InfoModal gameDetails={game} />
      <div>
        <Dice />
      </div>
    </main>
  );
}
