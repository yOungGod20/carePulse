import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import CardCancelDialog from "../alert/CardCancelDialog";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "../ui/alert";
import { Appointment } from "@/types/appwrite.types";
const AppointmentCard = ({
  type,
  appointment,
}: {
  type: string;
  appointment: Appointment;
}) => {
  return (
    <Card className={cn("flex flex-col max-w-[480px] px-4 pb-4 relative")}>
      {type === "cancelled" && (
        <Image
          src="/assets/icons/delete.svg"
          width={32}
          height={32}
          alt="delete"
          className="absolute right-6 top-6 cursor-pointer z-10 hover:scale-125"
        />
      )}
      <CardHeader
        className={cn("border-b-[1px] border-dark-500 pb-3", {
          "relative blur-[1px] cursor-default": type === "cancelled",
        })}
      >
        <CardTitle className="font-bold text-xl flex justify-between">
          <div className="flex items-center ">
            <span className="w-10 h-10 overflow-hidden rounded-full shrink-0 mr-4 ">
              <img
                className="aspect-square w-full"
                src="https://ui.shadcn.com/avatars/01.png"
              ></img>
            </span>
            <div className="flex flex-col w-full">
              <span className="font-bold text-xl ">
                {"Dr." + appointment.primaryPhysician}
              </span>
              <span className="text-sm text-[#9ca3af]">internal medicine</span>
            </div>
          </div>
          <span className="text-xl text-[#9ca3af] flex  items-center">
            <Image
              src="/assets/icons/phone.svg"
              width={24}
              height={24}
              alt="phonenumber"
            />
            : 13152889828
          </span>
        </CardTitle>
        <CardDescription className="text-sm text-[#9ca3af]">
          Our highly qualified doctors will provide you with high-quality
          services in a timely manner
        </CardDescription>
        <CardDescription className="text-sm text-[#9ca3af] text-balance"></CardDescription>
      </CardHeader>
      <CardContent
        className={cn(
          "flex justify-between items-start flex-col w-full font-bold gap-4 mt-2",
          {
            "relative blur-[1px] cursor-default": type === "cancelled",
          }
        )}
      >
        <h3 className="font-bold">Appointment information</h3>
        <div className="flex justify-between w-full">
          <span className="font-semibold text-[#9ca3af]">Patient Name</span>
          <span className=" ">{appointment.patient.name}</span>
        </div>
        <div className="flex justify-between w-full">
          <span className="font-semibold text-[#9ca3af]">Reason</span>
          <span className=" ">{appointment.reason}</span>
        </div>
        {type === "pending" && (
          <>
            <div className="flex justify-between w-full">
              <>
                <span className="font-semibold text-[#9ca3af]">
                  {"Expected Time"}
                </span>
                <span className=" ">
                  {formatDateTime(appointment.schedule).dateTime}
                </span>
              </>
            </div>
            <div className="flex justify-between w-full">
              <span className="font-semibold text-[#9ca3af]">Status</span>
              <span className="flex items-center text-blue-400">
                Pending
                <Image
                  src="/assets/icons/loader.svg"
                  width={24}
                  height={24}
                  alt="loader"
                  className="animate-spin  ml-2 items-center self-center"
                />
              </span>
            </div>
            <CardCancelDialog
              label="Update Appointment"
              type="update"
              patientId={appointment.patient.$id}
              appointment={appointment}
              userId={appointment.userId}
            />
            <CardCancelDialog
              label="Cancel Appointment"
              type="cancel"
              patientId={appointment.patient.$id}
              appointment={appointment}
              userId={appointment.userId}
            />
          </>
        )}
        {type === "scheduled" && (
          <>
            <div className="w-full flex flex-col justify-center items-center ">
              <Image
                src="/assets/images/successful.ico"
                width={120}
                height={120}
                alt="successful"
              />
              <span>Congratulations!</span>
              <span>Scheduled Successfully!</span>
              <span>
                You should arrived at{" "}
                <span className="text-green-500">
                  {formatDateTime(new Date()).dateTime}
                </span>{" "}
              </span>
            </div>
            <CardCancelDialog
              label="Cancel Appointment"
              type="cancel"
              patientId=""
              userId=""
            />
          </>
        )}
        {type === "cancelled" && (
          <>
            <div className="flex justify-between w-full">
              <>
                <span className="font-semibold text-[#9ca3af]">
                  {"Expected Time"}
                </span>
                <span className=" ">{formatDateTime(new Date()).dateTime}</span>
              </>
            </div>
          </>
        )}
      </CardContent>
      {type === "cancelled" && (
        <CardFooter>
          <Alert className="flex items-center justify-center border-dark-600 mt-4 ">
            <Image
              src="/assets/icons/error.svg"
              width={32}
              height={32}
              alt="cancelled"
              className="mr-2"
            />

            <AlertDescription className="text-[#dc2626] font-bold text-xl ">
              Appointment has been cancelled
            </AlertDescription>
          </Alert>
        </CardFooter>
      )}
    </Card>
  );
};

export default AppointmentCard;
