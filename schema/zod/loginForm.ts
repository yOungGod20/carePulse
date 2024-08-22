import * as z from "zod";
export enum FormFieldType {
  INPUT = "input",
  CHECK_BOX = "checkbox",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  DATA_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
  PASSWORD = "password",
}
export const loginForm = z.object({
  name: z
    .string()
    .min(1, { message: "Username is required" })
    .min(6, { message: "The password should not be less than six digits" }),
  email: z.string().email(),
  phone: z.string().refine(
    (phone) => {
      return /^\+\d{10,15}$/.test(phone);
    },
    { message: "Phone number is invalid" }
  ),
  password: z
    .string()
    .min(6, { message: "password supposed to longer than 6 digits" }),
});

export const Login = z.object({
  email: z.string().email(),
  password: z.string(),
});
