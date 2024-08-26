"use client";
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
import { cn } from "@/lib/utils";
import { Appointment } from "@/types/appwrite.types";
interface DialogProps {
  type: "update" | "cancel";
  patientId: string;
  userId: string;
  appointment?: Appointment;
  label: string;
}
const CardCancelDialog = ({
  patientId,
  userId,
  appointment,
  type,
  label,
}: DialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogTrigger
        onClick={() => {
          setIsOpen(true);
        }}
        className={cn(
          "w-full text-center justify-center sm:justify-start font-simibold text-sm  py-2",
          {
            "bg-red-800  hover:bg-red-800/75": type === "cancel",
            "bg-green-800  hover:bg-green-800/75": type === "update",
          }
        )}
      >
        {label}
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-dark-200">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex justify-between">
            {type === "update" ? "Update Appointment" : "Cancel Appointment"}
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
            {type === "cancel"
              ? "Are you sure you want to cancel your appointment?"
              : "Update appointment"}
          </AlertDialogDescription>
        </AlertDialogHeader>
        {type === "cancel" ? (
          <AppointmentForm
            open={isOpen}
            setOpen={setIsOpen}
            userId={userId}
            patientId={patientId}
            cancelledBy="self"
            type={"cancel"}
            appointment={appointment}
          />
        ) : (
          <AppointmentForm
            open={isOpen}
            setOpen={setIsOpen}
            userId={userId}
            patientId={patientId}
            type={"update"}
            appointment={appointment}
          />
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CardCancelDialog;
