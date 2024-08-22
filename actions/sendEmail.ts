"use server";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/email/EmailTemplate";
const resend = new Resend(process.env.RESEND_API_KEY);
// resend.domains.create({ name: "yangshen.site" });

export const sendEmail = async ({ email, message, name }: SendEmailParams) => {
  const { data, error } = await resend.emails.send({
    from: "niubi@yangshen.site",
    to: [email],
    subject: `Hello,${name}`,
    react: EmailTemplate({ firstName: name, message }),
  });
  if (error) {
    console.log(error);
  }
};

export const sendVerificationCode = async ({
  email,
  message,
  name,
}: SendEmailParams) => {
  console.log(email);
  const { data, error } = await resend.emails.send({
    from: "CarePulse@yangshen.site",
    to: [email],
    subject: message,
    react: EmailTemplate({ firstName: name, message }),
  });

  if (error) {
    console.log(error);
  }
};
