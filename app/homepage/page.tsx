import HomePageNav from "@/components/navbar/HomePageNav";
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const Page = () => {
  return (
    <div className="h-full bg-[#fff7ed] min-h-screen text-dark-200">
      <HomePageNav />
      <section className="px-24">
        <div className="flex justify-between ">
          <h1 className="text-7xl flex flex-col  gap-2 font-[400] mt-28">
            <span>To cute sometimes,</span>
            <span>to relieve often,</span>
            <span>to comfort always.</span>
          </h1>
          <div className="mt-24 mr-32">
            <Image
              src="/assets/images/oldandyoung.jpg"
              width={520}
              height={520}
              alt="oldandyoung"
              className="object-contain mr"
            />
          </div>
        </div>

        <p className="text-5xl font-semibold font-serif mt-32 ml-24  ">
          人身疾苦，与我无异。凡来请召，急去无迟。
        </p>
      </section>
      <section className="px-24 bg-slate-300"></section>
    </div>
  );
};

export default Page;
