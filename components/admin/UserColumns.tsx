"use client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { StatusIcon } from "@/constants";
import { Doctors } from "@/constants";
import { cn, formatDateTime } from "@/lib/utils";
import { Appointment } from "@/types/appwrite.types";

import { Badge } from "../ui/badge";
import { useState } from "react";
import Dialog from "../alert/Dialog";

export const UserColumns: ColumnDef<Appointment>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium"> {row.index + 1}</p>,
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => {
      const appointment = row.original;

      return <p className="text-14-medium">{appointment.patient?.name} </p>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const appointment = row.original;

      return (
        <div className="w-[100px]">
          <Badge
            className={cn(
              "font-bold flex text-zinc-200  items-center gap-3 cursor-default min-w-[120px]",
              {
                "bg-blue-600": appointment.status === "pending",
                "bg-yellow-600": appointment.status === "scheduled",
                "bg-red-600": appointment.status === "cancelled",
              }
            )}
          >
            <Image
              src={StatusIcon[appointment.status]}
              width={24}
              height={24}
              alt="status"
            />
            {appointment.status}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "schedule",
    header: "Time",
    cell: ({ row }) => {
      const appointment = row.original;

      return (
        <p className="text-14-medium">
          {formatDateTime(appointment.schedule).dateTime}
        </p>
      );
    },
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell: ({ row }) => {
      const appointment = row.original;
      const img = Doctors.find((item) => {
        if (item.name === appointment.primaryPhysician) return true;
        else return false;
      })?.image;

      return (
        <div className="flex items-center gap-2">
          <Image
            src={img!}
            height={24}
            width={24}
            alt={appointment.primaryPhysician}
          />
          <p className="text-14-medium">{appointment.primaryPhysician}</p>
        </div>
      );
    },
  },

  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <Dialog
          type="cancel"
          description=""
          patientId={appointment.patient?.$id}
          userId={appointment.userId}
          appointment={appointment}
          user={true}
        />
      );
    },
  },
];
