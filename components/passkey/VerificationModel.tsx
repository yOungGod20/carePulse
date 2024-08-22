"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import React, { useEffect, useState, useTransition } from "react";
import { AlertDialogFooter, AlertDialogHeader } from "../ui/alert-dialog";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Otp from "./otp";
import { Button } from "../ui/button";
import Message from "../alert/Message";
import { verification } from "@/actions/register.actions";

const VerificationModel = () => {
  const router = useRouter();
  const [passkey, setPasskey] = useState<string>("");
  const [error, setError] = useState("");
  const email = localStorage.getItem("email");
  const [isPending, startTransition] = useTransition();
  const onClick = async () => {
    if (!email) {
      setError("NO email");
      return;
    }
    startTransition(async () => {
      const res = await verification({ email, token: passkey });
      if (res?.error) {
        setError(error);
      }
      if (res?.success) {
        router.push("/auth/login");
      }
    });
  };
  return (
    <AlertDialog open={true}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex justify-between items-start">
            Login Verification
            <Image
              src="/assets/icons/close.svg"
              width={20}
              height={20}
              alt="close"
              onClick={() => {
                router.push("/auth/login");
              }}
              className="cursor-pointer"
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            To explore the more, please enter the passkey.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Otp passkey={passkey} setPasskey={setPasskey}></Otp>
        {error && (
          <Message
            title="Error"
            message="Passkey is not correct"
            classname="border-red-800 text-red-700 font-bold"
          ></Message>
        )}
        <AlertDialogAction onClick={onClick}>
          {isPending ? (
            <Image
              src="/assets/icons/loader.svg"
              className="animate-spin"
              width={24}
              height={24}
              alt="loader"
            />
          ) : (
            "Enter verification code"
          )}
        </AlertDialogAction>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default VerificationModel;
