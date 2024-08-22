import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import AppointmentForm from "../forms/appointmentForm";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Appointment } from "@/types/appwrite.types";
interface DialogProps {
  description: string;
  type: "schedule" | "cancel";
  patientId: string;
  userId: string;
  appointment?: Appointment;
  user?: boolean;
}
const Dialog = ({
  patientId,
  userId,
  appointment,
  type,
  user,
}: DialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogTrigger>
        {user ? (
          <span
            onClick={() => {
              setIsOpen(true);
            }}
            className={cn("w-full rounded-none font-simibold text-[16px] ", {
              "text-[#dc2626]   hover:underline": type === "cancel",
            })}
          >
            {type === "schedule" ? "Schedule" : "Cancel"}
          </span>
        ) : (
          <Button
            onClick={() => {
              setIsOpen(true);
            }}
            className={cn("w-full rounded-none font-simibold text-sm ", {
              "bg-yellow-600 hover:bg-yellow-600/75": type === "schedule",
              "bg-red-600  hover:bg-red-600/75": type === "cancel",
            })}
          >
            {type === "schedule" ? "Schedule" : "Cancel"}
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-dark-200">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex justify-between">
            {type === "schedule"
              ? "Schedule Appointment"
              : "Cancel Appointment"}
            <Image
              src="/assets/icons/close.svg"
              width={20}
              height={20}
              alt="close"
              onClick={() => {
                setIsOpen(false);
              }}
              className="cursor-pointer"
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            {type === "schedule"
              ? "Please confirm the following details to schedule."
              : "Are you sure you want to cancel your appointment?"}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AppointmentForm
          open={isOpen}
          setOpen={setIsOpen}
          userId={userId}
          patientId={patientId}
          type={type}
          appointment={appointment}
        />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Dialog;
