import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Patient } from "@/types/appwrite.types";
import Link from "next/link";
import { auth } from "@/auth";
const PatientCard = ({
  patient,
  userId,
}: {
  patient: Patient;
  userId: string;
}) => {
  return (
    <Card className="w-full max-w-[360px]">
      <CardContent className="flex justify-between items-center p-6">
        <div className="flex items-center ">
          <span className="w-10 h-10 overflow-hidden rounded-full mr-4 ">
            <img
              className="aspect-square"
              src={
                patient.gender === "Male"
                  ? "https://ui.shadcn.com/avatars/02.png"
                  : "https://ui.shadcn.com/avatars/01.png"
              }
            ></img>
          </span>
          <div className="flex flex-col ">
            <span className="font-medium">{patient.name}</span>
            <span className="text-sm text-[#9ca3af]">
              {patient.currentMedication}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant={"outline"}>Edit</Button>
          <Button variant={"outline"}>
            <Link href={`/patients/${userId}/new-appointment/${patient.$id}`}>
              Schedule
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientCard;
