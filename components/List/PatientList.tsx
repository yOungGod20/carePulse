import { Patient } from "@/types/appwrite.types";
import React from "react";
import PatientCard from "../Card/PatientCard";
import { auth } from "@/auth";
import { getPatients } from "@/actions/patient.action";
const PatientList = async () => {
  const session = await auth();
  const patients = (await getPatients(session?.user?.id!)) as Patient[];
  return (
    <>
      {patients.length === 0 ? (
        <div className="text-xl text-dark-600">
          <span>You don`t have any user</span>
          <span>
            Click <span className="text-green-400">&nbsp;Here&nbsp;</span> to
            register
          </span>
        </div>
      ) : (
        <div className="w-full">
          {patients.map((item) => {
            return (
              <PatientCard
                key={item.$id}
                userId={session?.user?.id!}
                patient={item}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default PatientList;
