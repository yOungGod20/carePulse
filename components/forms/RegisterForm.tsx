"use client";
import React, { useState, useTransition } from "react";
import { Form, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FormFieldType, loginForm } from "@/schema/zod/loginForm";
import { zodResolver } from "@hookform/resolvers/zod";
import FormItemField from "./FormItemField";
import SubmitButton from "./SubmitButton";
import { useRouter } from "next/navigation";
import Message from "../alert/Message";
import Link from "next/link";
import { register } from "@/actions/register.actions";
const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const onSubmit = (values: z.infer<typeof loginForm>) => {
    try {
      setError("");
      localStorage.setItem("email", values.email);
      startTransition(async () => {
        const res = await register(values);
        if (res?.error) {
          setError(res.error);
        }
        if (res.success) {
          setSuccess(res.success);
          router.push("/auth/register?verification=true");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const form = useForm<z.infer<typeof loginForm>>({
    resolver: zodResolver(loginForm),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormItemField
          control={form.control}
          name="name"
          label="Username"
          fieldType={FormFieldType.INPUT}
          placeholder="enter your name"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
          disable={isPending}
        />
        <FormItemField
          control={form.control}
          name="phone"
          label="Phone number"
          fieldType={FormFieldType.PHONE_INPUT}
          placeholder="phone number"
          disable={isPending}
        />
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
          fieldType={FormFieldType.INPUT}
          placeholder="******"
          iconSrc="/assets/icons/key.svg"
          iconAlt="password"
          disable={isPending}
        />

        <FormMessage />

        {error && (
          <Message
            classname="text-[#dc2626] border-[#b91c1c]"
            title="Error"
            message={error}
          />
        )}
        {success && (
          <Message
            classname="text-green-700 border-green-900"
            title="Success"
            message={success}
          />
        )}

        <SubmitButton className="mt-4" isLoading={isPending}>
          Sign Up
        </SubmitButton>
      </form>
      <div className="mt-4 flex justify-between">
        <span className="text-dark-600 text-sm">Already have an account?</span>
        <Link
          href={"/auth/login"}
          className="text-green-500 hover:underline text-sm cursor-pointer font-bold"
        >
          Login
        </Link>
      </div>
    </Form>
  );
};

export default RegisterForm;
