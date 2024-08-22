import { getAppointmentByUser } from "@/actions/appointment.action";
import { auth } from "@/auth";
import { DataTable } from "@/components/admin/DataTable";
import { StatCard } from "@/components/admin/StatCard";
import { stringify } from "querystring";
import React from "react";
import Image from "next/image";
import { UserColumns } from "@/components/admin/UserColumns";
const Page = async () => {
  const session = await auth();
  if (!session) {
    return null;
  }
  const { counts, appointments, totalCount } = await getAppointmentByUser(
    session?.user?.id!
  );
  const name = session?.user?.name;
  return (
    <>
      <div className="flex flex-col h-full p-4">
        <section className="flex flex-col items-center gap-4 lg:gap-0">
          <div className="my-12 min-w-[450px] hidden lg:block">
            <h2 className="text-5xl text-green-300 leading-relaxed letter tracking-normal font-bold  lg:block">
              Welcome back ,
            </h2>
            <p className="text-4xl text-white ml-24 leading-relaxed tracking-wider font-bold">
              {name}
            </p>
          </div>
          <Image
            src={"/assets/icons/logo-full.svg"}
            height={24}
            width={24}
            className="w-full"
            alt="main_icon"
          />
          <section className="admin-stat h-[50%] mb-4 lg:mb-0">
            <StatCard
              type="pending"
              count={counts.pendingCount}
              label="Pending appointments"
              icon={"/assets/icons/pending.svg"}
            />
            <StatCard
              type="appointments"
              count={counts.scheduledCount}
              label="Scheduled appointments"
              icon={"/assets/icons/appointments.svg"}
            />
            <StatCard
              type="cancelled"
              count={counts.cancelledCount}
              label="Cancelled appointments"
              icon={"/assets/icons/cancelled.svg"}
            />
          </section>
        </section>
        <DataTable type="user" columns={UserColumns} data={appointments} />
      </div>
    </>
  );
};

export default Page;
