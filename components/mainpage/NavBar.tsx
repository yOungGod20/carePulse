import React from "react";
import Image from "next/image";
import Link from "next/link";
import { NavBarItem } from "@/constants";
import LogoutButton from "../auth/logout-button";
const NavBar = () => {
  return (
    <nav className="flex justify-between items-center  border-b-2 border-dark-500">
      <div className="flex items-center gap-4">
        <h1 className="hidden lg:block">
          <Image
            src={"/assets/icons/logo-full.svg"}
            height={24}
            width={24}
            className="h-24 w-48"
            alt="main_icon"
          />
        </h1>
        <ul className="flex gap-4 p-4 text-xl">
          {NavBarItem.map((item) => {
            return (
              <li key={item.name} className="text-zinc-400  hover:text-zinc-50">
                <Link href={item.href}>{item.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex items-center gap-2 text-zinc-50 text-xl font-bold cursor-pointer hover:text-green-400 ">
        <LogoutButton>
          <span className="hidden lg:block">Log out</span>
          <Image
            src="/assets/icons/logout.svg"
            height={24}
            width={24}
            alt="logout"
            className="mr-4"
          />
        </LogoutButton>
      </div>
    </nav>
  );
};

export default NavBar;
