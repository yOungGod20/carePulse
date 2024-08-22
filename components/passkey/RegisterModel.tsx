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
import Message from "../alert/Message";
import { createUser } from "@/actions/register.actions";

const RegisterModel = () => {
  const router = useRouter();
  const [passkey, setPasskey] = useState<string>("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isPending, startTransition] = useTransition();
  const onClick = async () => {
    setError("");
    setSuccess("");
    const email = localStorage.getItem("email");
    if (!email) {
      setError("NO email");
      return;
    }
    startTransition(async () => {
      const res = await createUser({ passkey, userEmail: email });
      if (res?.error) {
        setError(res.error);
      }
      if (res?.success) {
        setSuccess(res.success);
      }
    });
  };
  return (
    <AlertDialog open={true}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex justify-between items-start">
            Register Verification
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
            message={error}
            classname="border-red-800 text-red-700 font-bold"
          ></Message>
        )}
        {success && (
          <Message
            title="Success"
            message={success}
            classname="border-green-800 text-green-700 font-bold"
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

export default RegisterModel;
