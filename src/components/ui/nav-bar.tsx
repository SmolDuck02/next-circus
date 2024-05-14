"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function NavBar() {
  const pathname = usePathname();
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
  ];

  return (
    <div className="flex justify-center gap-7 absolute top-7 w-auto left-1/2 right-1/2  text-slate-700">
      {navLinks.map((link, index) => (
        <Link
          key={index}
          className={clsx("cursor-pointer", {
            "font-bold text-slate-500": pathname == link.href,
          })}
          href={link.href}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
}
