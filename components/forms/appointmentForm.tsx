"use client";
import React, { useState, useTransition } from "react";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FormFieldType } from "@/schema/zod/loginForm";
import { zodResolver } from "@hookform/resolvers/zod";
import FormItemField from "./FormItemField";
import SubmitButton from "./SubmitButton";
import Message from "../alert/Message";
import { Doctors } from "@/constants";
import Image from "next/image";
import { SelectItem } from "../ui/select";
import {
  CreateAppointmentSchema,
  getAppointmentSchema,
} from "@/schema/zod/validation";
import {
  createAppointment,
  updateAppointment,
} from "@/actions/appointment.action";
import { useRouter } from "next/navigation";
import { Appointment } from "@/types/appwrite.types";
interface AppointmentFormProps {
  userId: string;
  type: "create" | "schedule" | "cancel";
  patientId?: string;
  appointment?: Appointment;
  open?: boolean;
  setOpen?: (x: boolean) => void;
}

const AppointmentForm = ({
  setOpen,
  userId,
  type,
  patientId,
  appointment,
}: AppointmentFormProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const AppointmentSchema = getAppointmentSchema(type);
  let status;
  switch (type) {
    case "schedule":
      status = "scheduled";
      break;
    case "cancel":
      status = "cancelled";
      break;
    default:
      status = "pending";
  }
  const onSubmit = async (values: z.infer<typeof AppointmentSchema>) => {
    if (type === "create" && patientId) {
      try {
        setError("");
        const formData = {
          note: values.note,
          reason: values.reason!,
          primaryPhysician: values.primaryPhysician,
          status: status as Status,
          userId,
          patient: patientId,
          schedule: new Date(values.schedule),
        };
        startTransition(async () => {
          const newAppointment = await createAppointment(formData);
          if (newAppointment) {
            form.reset();
            router.push(
              `/patients/${userId}/new-appointment/success?appointmentId=${newAppointment.$id}`
            );
          }
          if (setOpen) {
            setOpen(false);
          }
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        setError("");
        const formData = {
          appointment: { ...values, status },
          type,
          userId,
          appointmentId: appointment?.$id!,
          timeZone: "",
        };
        startTransition(async () => {
          await updateAppointment(formData);
          if (setOpen) {
            setOpen(false);
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const form = useForm<z.infer<typeof AppointmentSchema>>({
    resolver: zodResolver(AppointmentSchema),
    defaultValues: {
      primaryPhysician: appointment ? appointment.primaryPhysician : "",
      schedule: appointment
        ? new Date(appointment.schedule)
        : new Date(Date.now()),
      reason: appointment ? appointment.reason : "",
      note: appointment ? appointment.note : "",
    },
  });
  let buttonLabel;
  switch (type) {
    case "cancel":
      buttonLabel = "Cancel Appointment";
      break;
    case "schedule":
      buttonLabel = "Schedule Appointment";
      break;
    default:
      buttonLabel = "Submit Apppointment";
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <>
          <FormItemField
            control={form.control}
            name="primaryPhysician"
            label="PrimaryPhysician"
            fieldType={FormFieldType.SELECT}
            disable={type === "create" ? isPending : true}
            placeholder={appointment?.primaryPhysician}
          >
            {Doctors.map((doctor) => {
              return (
                <SelectItem
                  key={doctor.name}
                  value={doctor.name}
                  className="hover:bg-dark-600"
                >
                  <div className="flex cursor-pointer  gap-2 items-center ">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      width={32}
                      height={32}
                      className="rounded-full border border-dark-500"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              );
            })}
          </FormItemField>

          <div className="flex gap-4">
            <FormItemField
              control={form.control}
              name="reason"
              label="Reason for appointment"
              fieldType={FormFieldType.TEXTAREA}
              placeholder="ex:Annual monthly check-up"
              disable={type === "create" ? isPending : true}
            />
            <FormItemField
              control={form.control}
              name="note"
              label="Additional comments/notes"
              fieldType={FormFieldType.TEXTAREA}
              placeholder="ex:Prefer afternoon appointments, if possible"
              disable={type === "create" ? isPending : true}
            />
          </div>
          <FormItemField
            control={form.control}
            name="schedule"
            label="Expected appointment date"
            fieldType={FormFieldType.DATA_PICKER}
            placeholder="Select your appointment date"
            disable={type === "cancel" ? false : isPending}
          />
        </>

        {type === "cancel" && (
          <FormItemField
            control={form.control}
            name="cancellationReason"
            label="Why you want to cancel"
            fieldType={FormFieldType.TEXTAREA}
            placeholder="too busy"
            disable={isPending}
          />
        )}

        {error && (
          <Message
            classname="text-[#dc2626] border-[#b91c1c]"
            title="Error"
            message={error}
          />
        )}

        <SubmitButton
          className={
            type === "cancel" ? "bg-red-800 hover:bg-red-900 mt-8" : "mt-8"
          }
          isLoading={isPending}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
