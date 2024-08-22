"use client";
import React, { useEffect, useState, useTransition } from "react";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FormFieldType, loginForm } from "@/schema/zod/loginForm";
import { zodResolver } from "@hookform/resolvers/zod";
import FormItemField from "./FormItemField";
import SubmitButton from "./SubmitButton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { login } from "@/actions/register.actions";
import Message from "../alert/Message";
import { Login } from "@/schema/zod/loginForm";
import Link from "next/link";
const bcrypt = require("bcryptjs");
const LoginForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const searchParams = useSearchParams();

  const onSubmit = (values: z.infer<typeof Login>) => {
    try {
      setError("");
      localStorage.setItem("email", values.email);
      startTransition(async () => {
        const res = await login(values);

        if (res?.error) {
          setError(res.error);
        } else if (res?.success) {
          setSuccess(res.success);
          router.push("/auth/login?verification=true");
        } else {
          router.push("/main");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   try {
  //     if (
  //       searchParams.get("verification") === null &&
  //       form.getValues().password &&
  //       form.getValues().password
  //     ) {
  //       setError("");
  //       form.handleSubmit((values) => {
  //         startTransition(async () => {
  //           const res = await login(values);
  //           if (res?.error) {
  //             setError(res.error);
  //           } else if (res?.success) {
  //             setSuccess(res.success);

  //             router.push("/auth/login?verification=true");
  //           } else {
  //             router.push("/main");
  //           }
  //         });
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [p]);
  const form = useForm<z.infer<typeof Login>>({
    resolver: zodResolver(Login),
    defaultValues: {
      password: "",
      email: "",
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormItemField
          control={form.control}
          name="email"
          label="Email"
          fieldType={FormFieldType.INPUT}
          placeholder="enter your email"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
          disable={isPending}
        />
        <FormItemField
          control={form.control}
          name="password"
          label="Password"
          fieldType={FormFieldType.PASSWORD}
          placeholder="******"
          iconSrc="/assets/icons/key.svg"
          iconAlt="password"
          disable={isPending}
        />

        {error && (
          <Message
            classname="text-[#dc2626] border-[#b91c1c]"
            title="Error"
            message={error}
          />
        )}

        <SubmitButton className="mt-4" isLoading={isPending}>
          Login
        </SubmitButton>
      </form>
      <div className="mt-4 flex justify-between">
        <span className="text-dark-600 text-sm">Do not have an account?</span>
        <Link
          href={"/auth/register"}
          className="text-green-500 hover:underline text-sm cursor-pointer font-bold"
        >
          Sign Up
        </Link>
      </div>
    </Form>
  );
};

export default LoginForm;
