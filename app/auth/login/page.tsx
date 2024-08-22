import RegisterForm from "@/components/forms/RegisterForm";
import PasskeyModel from "@/components/passkey/passkeyModel";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import LoginForm from "@/components/forms/LoginForm";
import VerificationModel from "@/components/passkey/VerificationModel";
const Page = ({ searchParams }: SearchParamProps) => {
  const isAdmin = searchParams.admin === "true";
  const isVerification = searchParams.verification === "true";
  return (
    <div className="flex h-screen max-h-screen">
      {isVerification && <VerificationModel></VerificationModel>}
      {isAdmin && <PasskeyModel></PasskeyModel>}
      <section className="remove-scrollbar container my-auto max-w-[600px]  ">
        <div className="sub-container">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="patient"
            height={1000}
            width={1000}
            className="mb-12 h-10 w-fit"
          />
          <h2 className="font-bold text-3xl">Hi there 👋</h2>
          <p className="text-sm text-dark-600 mb-12">Login to start</p>
          <LoginForm />
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left font-semibold">
              © 2024 CarePulse
            </p>
            <Link
              href="/auth/login?admin=true"
              className="text-green-500 underline font-semibold"
            >
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image
        src="/assets/images/onboarding-img.png"
        alt="patient"
        height={1000}
        width={1000}
        className="w-[50%] side-img object-cover"
      />
    </div>
  );
};

export default Page;
