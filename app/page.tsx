import LogoutButton from "@/components/auth/logout-button";
import React from "react";
import { auth } from "@/auth";
import { getUserByEmail } from "@/actions/register.actions";
const Page = async () => {
  const session = await auth();
  if (!session?.user) return null;
  console.log(session.user);
  return (
    <div>
      <LogoutButton>logout</LogoutButton>
    </div>
  );
};

export default Page;
