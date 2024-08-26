"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import React, { useEffect, useState } from "react";
import { AlertDialogFooter, AlertDialogHeader } from "../ui/alert-dialog";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Otp from "./otp";
import { Button } from "../ui/button";
import Message from "../alert/Message";
import { decryptKey, encryptKey } from "@/lib/utils";

const PasskeyModel = () => {
  const router = useRouter();
  const [passkey, setPasskey] = useState<string>("");
  const [error, setError] = useState(false);
  const encryptedKey = localStorage.getItem("accessKey");
  useEffect(() => {
    if (encryptedKey) {
      const key = decryptKey(encryptedKey);
      if (key === process.env.NEXT_PUBLIC_PASSKEY) {
        router.replace("/admin");
      }
    }
  }, [encryptedKey]);
  return (
    <AlertDialog open={true}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex justify-between items-start">
            Admin Access Verification
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
            To access the admin page, please enter the passkey.
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
        <AlertDialogAction
          onClick={(e) => {
            e.preventDefault();
            setError(false);
            if (passkey == process.env.NEXT_PUBLIC_PASSKEY) {
              const encryptedKey = encryptKey(passkey);
              localStorage.setItem("accessKey", encryptedKey);
              router.replace("/admin");
            } else {
              setError(true);
            }
          }}
        >
          Enter Admin Passkey
        </AlertDialogAction>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PasskeyModel;
