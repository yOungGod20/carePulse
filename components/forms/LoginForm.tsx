"use client";
import React, { useState, useTransition } from "react";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FormFieldType, loginForm } from "@/schema/zod/loginForm";
import { zodResolver } from "@hookform/resolvers/zod";
import FormItemField from "./FormItemField";
import SubmitButton from "./SubmitButton";
import { useRouter } from "next/navigation";
import { createUser, getUserByEmail, login } from "@/actions/register.actions";
import Message from "../alert/Message";
import { Login } from "@/schema/zod/loginForm";
const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const onSubmit = (values: z.infer<typeof Login>) => {
    try {
      setError("");
      startTransition(async () => {
        const res = await login(values);
        // if (res?.newUser) {
        //   router.push(`/patients/${res.newUser.$id}/register`);
        // }
        // if (res?.error) {
        //   setError(res.error);
        // }
      });
    } catch (error) {
      console.log(error);
    }
  };
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
          fieldType={FormFieldType.INPUT}
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
    </Form>
  );
};

export default LoginForm;
