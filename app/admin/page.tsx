import React, { Suspense } from "react";
import { getRecentAppointments } from "@/actions/appointment.action";
import { DataTable } from "@/components/admin/DataTable";
import { columns } from "../../components/admin/columns";

const Page = async ({ searchParams }: SearchParamProps) => {
  const type = (searchParams.type as string) || "all";
  const appointments = await getRecentAppointments(type);
  return (
    <Suspense fallback={<div></div>}>
      <DataTable
        type="admin"
        data={appointments.appointments}
        columns={columns}
      />
    </Suspense>
  );
};

export default Page;
