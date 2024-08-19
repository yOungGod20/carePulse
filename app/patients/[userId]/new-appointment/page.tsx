import React from "react";
import Image from "next/image";
import AppointmentForm from "@/components/forms/appointmentForm";
import { getPatient } from "@/actions/patient.action";
const Page = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId);
  return (
    <div className="flex h-screen max-h-screen ">
      <section className="remove-scrollbar container my-auto ">
        <div className="sub-container flex flex-col max-w-[860px]   ">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="patient"
            height={1000}
            width={1000}
            className="mb-12 h-10 w-fit"
          />
          <h1 className="font-bold text-3xl">Hi there 👋</h1>
          <p className="text-sm text-dark-600 mb-12">
            Request a new appointment in 10 seconds
          </p>
          <AppointmentForm
            userId={userId}
            patientId={patient.$id}
            type="create"
          />
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left font-semibold">
              © 2024 CarePulse
            </p>
          </div>
        </div>
      </section>
      <div>
        <Image
          src="/assets/images/appointment-img.png"
          alt="patient"
          height={1000}
          width={1000}
          className="side-img max-w-[380px] object-cover  "
        />
      </div>
    </div>
  );
};

export default Page;
