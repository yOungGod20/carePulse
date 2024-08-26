import { auth } from "@/auth";
import { HomePageNavItem } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const HomePageNav = async () => {
  const session = await auth();
  return (
    <nav className="p-6 flex justify-between font-semibold text-xl items-center">
      <div className="flex items-center gap-32">
        <span className="text-3xl font-bold flex items-center ">
          <Image
            src="/assets/icons/logo-icon.svg"
            width={64}
            height={64}
            alt="logo"
          />
          CarePulse
        </span>
        <ul className="flex items-center gap-8 ">
          {HomePageNavItem.map((item) => {
            return (
              <li className=" hover:text-green-500">
                <Link href={"#"}>{item.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex gap-4 items-center ">
        {session ? (
          <Button className="bg-green-800 text-xl text-white font-semibold py-6 hover:bg-green-800/75">
            <Link href="/main">Management</Link>
          </Button>
        ) : (
          <>
            <Button className="text-xl font-semibold" variant="link">
              <Link href="/auth/login">Log in</Link>
            </Button>
            <Button className="bg-green-800 text-xl text-white font-semibold py-6 hover:bg-green-800/75">
              <Link href="/auth/register">Get started</Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default HomePageNav;
