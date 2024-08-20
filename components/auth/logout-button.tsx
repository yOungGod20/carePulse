"use client";
import { signOut } from "next-auth/react";
import React from "react";
interface logoutButtonProps {
  children: React.ReactNode;
}
const LogoutButton = ({ children }: logoutButtonProps) => {
  return (
    <span
      className="cursor:pointer"
      onClick={() => {
        signOut();
      }}
    >
      {children}
    </span>
  );
};

export default LogoutButton;
