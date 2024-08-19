import { getUser } from "@/actions/register.actions";
import PatientForm from "@/components/forms/PatientForm";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = async ({ params: { userId } }: SearchParamProps) => {
  //TODO 将来实现一下没有user报错 或者转向登录页面
  const user = await getUser(userId);
  return (
    <div className="flex ">
      <section className="remove-scrollbar container">
        <div className="sub-container flex flex-col max-w-[860px]  ">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="patient"
            height={1000}
            width={1000}
            className="mb-12 h-10 w-fit"
          />
          <h1 className="font-bold text-3xl">Welcome 👋</h1>
          <p className="text-sm text-dark-600 mb-12">
            Let us know more about yourself.
          </p>
          <PatientForm user={user} />
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left font-semibold">
              © 2024 CarePulse
            </p>
            <Link
              href="/?admin=true"
              className="text-green-500 underline font-semibold"
            >
              Admin
            </Link>
          </div>
        </div>
      </section>
      <div className="h-[2100px] overflow-hidden">
        <Image
          src="/assets/images/register-img.png"
          alt="patient"
          height={1000}
          width={1000}
          className="side-img max-w-[380px] object-cover  "
        />
        <Image
          src="/assets/images/register-img.png"
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
