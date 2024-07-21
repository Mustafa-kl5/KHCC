import { object, string } from "yup";

export const resetPasswordSchema = object({
  email: string()
    .required("email is required!")
    .email("please enter a valid email"),
}).required();
