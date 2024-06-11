"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RockSingers() {
  const [numberSingers, setNumberSingers] = useState(0);
  return (
    <>
      <RockMenu setNumberSingers={setNumberSingers} />
    </>
  );
}

function RockMenu({ setNumberSingers }: { setNumberSingers: (newValue: number) => void }) {
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    router.push(`/rock-singers/1`);
  };
  return (
    <Card className="w-[350px] bg-opacity-50">
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
        <CardDescription>How many singers will be joining today?</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex items-center justify-between  space-x-2">
              {/* <Label htmlFor="number_singers">Number of singers</Label> */}
              <Select onValueChange={(value: string) => setNumberSingers(parseInt(value, 10))}>
                <SelectTrigger id="number_singers" className="flex-1">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                </SelectContent>
              </Select>
              <Button type="submit">Continue</Button>
            </div>
            {/* {new Array(numberSingers).map(() => (
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name of rock</Label>
                <Input id="name" placeholder="Name of your project" />
              </div>
            ))} */}
          </div>
        </form>
      </CardContent>
      {/* <CardFooter className="flex justify-end">
        <Button variant="outline">Cancel</Button>
      </CardFooter> */}
    </Card>
  );
}
