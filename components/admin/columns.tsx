"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { StatusIcon } from "@/constants";
import { Doctors } from "@/constants";
import { cn, formatDateTime } from "@/lib/utils";
import { Appointment } from "@/types/appwrite.types";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "../ui/badge";
import { useState } from "react";
import Dialog from "../alert/Dialog";

export const columns: ColumnDef<Appointment>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium "> {row.index + 1}</p>,
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
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 focus-visible:ring-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0m0 7a1 1 0 1 0 2 0a1 1 0 1 0-2 0m0-14a1 1 0 1 0 2 0a1 1 0 1 0-2 0"
                />
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="bg-dark-300 border-dark-600 flex flex-col p-0"
          >
            <Dialog
              type="schedule"
              description=""
              patientId={appointment.patient?.$id}
              userId={appointment.userId}
              appointment={appointment}
            />
            <Dialog
              type="cancel"
              description=""
              patientId={appointment.patient?.$id}
              userId={appointment.userId}
              appointment={appointment}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
