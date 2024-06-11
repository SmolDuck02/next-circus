"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();

  return (
    <Button className="fixed top-7 left-7" variant="link" onClick={() => router.push("/")}>
      Back
    </Button>
  );
}
