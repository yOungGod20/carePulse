import NavBar from "@/components/navbar/NavBar";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <div className="mx-auto max-w-[1480px] flex flex-col w-full h-screen">
        <NavBar />
        <div className="grow">{children}</div>
      </div>
    </SessionProvider>
  );
};

export default Layout;
