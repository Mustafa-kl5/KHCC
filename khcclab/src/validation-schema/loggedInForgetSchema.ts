import { PASSWORD_PATTERN } from "utils/constant";
import { object, string, ref } from "yup";

export const registrationSchema = object({
  password: string()
    .required("password is required!")
    .matches(PASSWORD_PATTERN, "the password at least should be 8 characters"),
  confirmPassword: string()
    .required("confirm the password please")
    .oneOf([ref("password")], "password does not match!")
    .matches(PASSWORD_PATTERN, "the password at least should be 8 characters"),
}).required();
