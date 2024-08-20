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
import { createUser, getUserByEmail } from "@/actions/register.actions";
import Message from "../alert/Message";

const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const router = useRouter();
  const onSubmit = (values: z.infer<typeof loginForm>) => {
    try {
      setError("");

      startTransition(async () => {
        const res = await createUser(values);
        if (res?.newUser) {
          router.push(`/patients/${res.newUser.$id}/register`);
        }
        if (res?.error) {
          setError(res.error);
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
          name="password"
          label="Password"
          fieldType={FormFieldType.INPUT}
          placeholder="******"
          iconSrc="/assets/icons/key.svg"
          iconAlt="password"
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
        <FormMessage />

        {error && (
          <Message
            classname="text-[#dc2626] border-[#b91c1c]"
            title="Error"
            message={error}
          />
        )}

        <SubmitButton className="mt-4" isLoading={isPending}>
          Get Started
        </SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
