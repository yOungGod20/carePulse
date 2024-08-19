import * as z from "zod";
export enum FormFieldType {
  INPUT = "input",
  CHECK_BOX = "checkbox",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  DATA_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}
export const loginForm = z.object({
  username: z
    .string()
    .min(1, { message: "Username is required" })
    .min(6, { message: "The password should not be less than six digits" }),
  email: z.string().email(),
  phonenumber: z.string().refine(
    (phone) => {
      return /^\+\d{10,15}$/.test(phone);
    },
    { message: "Phone number is invalid" }
  ),
});
