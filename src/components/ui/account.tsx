"use client";

// import { logout } from "~/lib/actions/auth";

// import { User } from "~/lib/schema";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
} from "@/components/ui/sheet";
import { UserProfile, useUser } from "@auth0/nextjs-auth0/client";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Label } from "./label";

interface Loading {
  state: boolean;
  message: string;
}
export default function Account() {
  const handleViewProfile = () => {};
  const [userr, setUserr] = useState<UserProfile>();
  const [isMounted, setIsMounted] = useState(true);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isSheet, setIsSheet] = useState(false);
  const { user, error, isLoading } = useUser();

  if (error) console.log(error.message);

  useEffect(() => {
    setIsMounted(false);
  }, []);

  return (
    <>
      {!isMounted &&
        (isLoading2 ? (
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin " />
            Please wait
          </Button>
        ) : user?.name ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {/* <div className="z-50 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full  bg-red-900 text-sm font-normal text-white">
                {user?.name[0]}
              </div> */}
              <img
                src={user.picture || ""}
                alt={"user"}
                className="z-50 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full"
              ></img>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="text-base">{user.name}</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setIsSheet(true)}>Profile</DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/api/auth/logout" onClick={() => setIsLoading2(true)}>
                  Log Out
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          !isLoading && (
            <Link href="/api/auth/login" onClick={() => setIsLoading2(true)}>
              <Button variant={"secondary"}>Login</Button>
            </Link>
          )
        ))}

      <Sheet open={isSheet} onOpenChange={() => setIsSheet(false)}>
        <SheetContent className="w-80 flex flex-col justify-between">
          <SheetHeader>
            <SheetDescription>Profile Information</SheetDescription>

            <div className="w-full  h-56 flex flex-col items-center justify-center gap-3">
              <Image
                src={user && user.picture ? user.picture.toString() : ""}
                alt="User Pic"
                width={100}
                height={100}
                className="rounded-full"
              />
              <div className="text-lg">{user ? user.nickname : "Anonii"}</div>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground" htmlFor="firstname">
                Name
              </Label>
              <p>{user ? user.name : "Guest"}</p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground" htmlFor="firstname">
                Email
              </Label>
              <p>{user ? user.email : "guest@guest.com"}</p>
            </div>
          </SheetHeader>
          <SheetFooter>
            <Button className="w-full" variant="destructive">
              Delete account
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
