"use client";

import { User } from "@/lib/schema";
import { LogOut, UserRound } from "lucide-react";
import { useState } from "react";
// import { logout } from "~/lib/actions/auth";

// import { User } from "~/lib/schema";

import { Button } from "@/components/ui/button";
import LoginModal from "../modals/login-modal";

export default function Account({ user }: { user: User | null }) {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const handleAccountClick = () => {
    setIsShowMenu(!isShowMenu);
  };
  return (
    <>
      <div className="absolute right-7 top-7 ">
        {user ? (
          <div
            onClick={() => handleAccountClick()}
            className="z-50 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-yellow-400 bg-red-900 text-sm font-normal text-white"
          >
            {user.firstName[0] || "G"}
          </div>
        ) : (
          <Button
            onClick={() => {
              const modal = document.getElementById("login_modal");
              if (modal instanceof HTMLDialogElement) modal.showModal();
            }}
            variant="secondary"
          >
            Login
          </Button>
        )}
      </div>
      {isShowMenu && <AccountMenu user={user} />}
      <LoginModal />
    </>
  );
}

function AccountMenu({ user }: { user: User | null }) {
  const menuItems = [
    { id: 1, name: user?.email || "Guest", icon: UserRound },
    { id: 2, name: user ? "Logout" : "Login", icon: LogOut },
  ];
  return (
    <div className="absolute right-7 top-16 z-50 flex h-auto w-48 flex-col rounded bg-white p-2 text-sm">
      <span className="m-2 text-base">
        {user?.firstName} {user?.lastName}{" "}
      </span>
      {menuItems.map((item, index) => (
        <div
          key={item.id}
          className="flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-gray-100"
          onClick={async () => {
            if (item.id === 2) {
              if (user) {
                // await logout();
              } else {
                const loginModal = document.getElementById("login_modal");
                if (loginModal instanceof HTMLDialogElement) {
                  loginModal.showModal();
                }
              }
            }
          }}
        >
          <item.icon size={15} />

          {item.name}
        </div>
      ))}
    </div>
  );
}
