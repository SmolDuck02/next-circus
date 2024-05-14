"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();
  return (
    <Button className="text-slate-50 ml-7" variant="link" onClick={router.back}>
      Back
    </Button>
  );
}
