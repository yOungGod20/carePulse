"use server";
import { Appointment } from "./../types/appwrite.types";

import { database } from "@/lib/appwrite.config";
import * as z from "zod";
import { ID, Query } from "node-appwrite";
import { revalidatePath } from "next/cache";
import { formatDateTime, parseStringify } from "@/lib/utils";

import { sendEmail } from "./sendEmail";
import { getUser } from "./register.actions";

export const createAppointment = async (values: CreateAppointmentParams) => {
  try {
    const newAppointment = await database.createDocument(
      process.env.DATABASE!,
      process.env.APPOINTMENT!,
      ID.unique(),
      values
    );
    revalidatePath("/admin");
    return parseStringify(newAppointment);
  } catch (error) {
    console.log(error);
  }
};

export const updateAppointment = async (values: UpdateAppointmentParams) => {
  try {
    const updatedAppointment = await database.updateDocument(
      process.env.DATABASE!,
      process.env.APPOINTMENT!,
      values.appointmentId,
      values.appointment
    );
    const user = await getUser(values.userId);
    if (!updatedAppointment) {
      throw new Error();
    }
    if (values.appointment.status === "scheduled") {
      const message = `Congratualations! Your appointment with doctor ${
        values.appointment.primaryPhysician
      } will take place at${
        formatDateTime(values.appointment.schedule).dateTime
      }`;
      sendEmail({ email: "1746519797@qq.com", message, name: user.name });
    }
    revalidatePath("/admin");
    return parseStringify(updatedAppointment);
  } catch (error) {
    console.log(error);
  }
};

export const getAppointment = async (appointmentId: string) => {
  const appointment = await database.getDocument(
    process.env.DATABASE!,
    process.env.APPOINTMENT!,
    appointmentId
  );
  if (!appointment) {
    return { error: "Appointment not exist" };
  }
  revalidatePath("/admin");
  return parseStringify(appointment);
};

export const getRecentAppointments = async (type: string) => {
  try {
    for (let i = 0; i < 10; i++) {
      // await createAppointment({
      //   userId: "66c1912100146fa310d8",
      //   patient: "66c1918e003a2e1fb01e",
      //   primaryPhysician: "Hardik Sharma",
      //   reason: "",
      //   schedule: new Date(),
      //   status: "pending",
      //   note: "我下午有空",
      // });
    }
    let appointments;
    if (type === "all") {
      appointments = await database.listDocuments(
        process.env.DATABASE!,
        process.env.APPOINTMENT!,
        [Query.orderDesc("schedule")]
      );
    } else {
      appointments = await database.listDocuments(
        process.env.DATABASE!,
        process.env.APPOINTMENT!,
        [Query.orderDesc("schedule"), Query.equal("status", [type])]
      );
    }

    const initialValues = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };
    const counts = (appointments.documents as Appointment[]).reduce(
      (acc, appointment) => {
        switch (appointment.status) {
          case "scheduled":
            acc.scheduledCount++;
            break;
          case "cancelled":
            acc.cancelledCount++;
            break;
          case "pending":
            acc.pendingCount++;
            break;
        }
        return acc;
      },
      initialValues
    );
    const data = {
      counts,
      appointments: appointments.documents,
      totalCount: appointments.total,
    };

    return parseStringify(data);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the recent appointments:",
      error
    );
  }
};

export const getAppointmentByUser = async (userid: string) => {
  try {
    const appointments = await database.listDocuments(
      process.env.DATABASE!,
      process.env.APPOINTMENT!,
      [Query.equal("userId", [userid])]
    );
    const initialValues = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };
    const counts = (appointments.documents as Appointment[]).reduce(
      (acc, appointment) => {
        switch (appointment.status) {
          case "scheduled":
            acc.scheduledCount++;
            break;
          case "cancelled":
            acc.cancelledCount++;
            break;
          case "pending":
            acc.pendingCount++;
            break;
        }
        return acc;
      },
      initialValues
    );
    const data = {
      counts,
      appointments: appointments.documents,
      totalCount: appointments.total,
    };

    return parseStringify(data);
  } catch (error) {
    console.log("An error occurred while getAppointmentByUser:", error);
  }
};
