"use server";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/email/EmailTemplate";
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ email, message }: SendEmailParams) => {
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: ["1746519797@qq.com"],
    subject: "Hello world",
    react: EmailTemplate({ firstName: "John", message }),
  });
  console.log(error);
};
