import { Appointment } from "@/types/appwrite.types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import PatientCard from "../Card/PatientCard";
import { useSession } from "next-auth/react";
import { getPatients } from "@/actions/patient.action";
import PatientList from "./PatientList";
import { auth } from "@/auth";
import AppointmentCard from "../Card/AppointmentCard";
const CardList = async ({ appointments }: { appointments: Appointment[] }) => {
  return (
    <>
      {appointments.length > 0 ? (
        <div>
          {appointments.map((item) => {
            return (
              <div className="grid grid-cols-3">
                <AppointmentCard type={item.status} appointment={item} />
              </div>
            );
          })}
        </div>
      ) : (
        <div
          className={cn(
            "flex justify-center items-center flex-col text-xl text-dark-600"
          )}
        >
          <Image
            src="/assets/gifs/empty.gif"
            width={320}
            height={320}
            alt="empty"
          />
          <span>Do not have an appointment?</span>
          <span>
            TO
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="link"
                  className="text-xl text-green-500 font-bold"
                >
                  register
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Create a appointment</AlertDialogTitle>
                  <AlertDialogDescription>
                    By registering the patient's information, we are informed
                    and the best treatment plan is specified
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <PatientList />
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction></AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            a patient and schedule one?
          </span>
        </div>
      )}
    </>
  );
};

export default CardList;
