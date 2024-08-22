import NavBar from "@/components/mainpage/NavBar";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
const Layout = async ({ children }: { children: React.ReactNode }) => {
  let session;
  while (!session) {
    session = await auth();
    console.log(111);
  }
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
