import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { StatCard } from "@/components/admin/StatCard";
import { getRecentAppointments } from "@/actions/appointment.action";
import Filter from "@/components/admin/Filter";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const { counts } = await getRecentAppointments("all");
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/logo-full.svg"
            height={32}
            width={162}
            alt="logo"
            className="h-8 w-fit"
          />
        </Link>
        <p className="text-16-semibold">Admin Dashboard</p>
      </header>
      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">
            Start the day with managing new appointments
          </p>
        </section>
        <Suspense fallback={<div></div>}>
          <section className="admin-stat">
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
        </Suspense>

        <Filter />
        {children}
      </main>
    </div>
  );
};

export default Layout;
