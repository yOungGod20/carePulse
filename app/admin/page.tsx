import React, { Suspense } from "react";
import { getRecentAppointments } from "@/actions/appointment.action";
import { DataTable } from "@/components/admin/DataTable";
import { columns } from "../../components/admin/columns";
import Filter from "@/components/admin/Filter";
const Page = async ({ searchParams }: SearchParamProps) => {
  const type = (searchParams.type as string) || "all";
  const appointments = await getRecentAppointments(type);
  return (
    <>
      <Filter />
      <DataTable
        type="admin"
        data={appointments.appointments}
        columns={columns}
      />
    </>
  );
};

export default Page;
