import { Comic_Neue, Inter, Libre_Baskerville, Poppins } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });
export const comic = Comic_Neue({
  subsets: ["latin"], // You can specify other subsets if needed
  weight: ["300", "400", "700"], // Include all available weights
  style: ["normal", "italic"], // Include all available styles
});

export const poppins = Poppins({ subsets: ["latin"], weight: ["400", "900"] });

export const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "700"],
});
