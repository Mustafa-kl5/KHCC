import { PASSWORD_PATTERN } from "utils/constant";
import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string()
    .required("email is required!")
    .email("please enter a valid email"),
  password: Yup.string()
    .required("password is required!")
    .matches(PASSWORD_PATTERN, "the password at least should be 8 characters"),
}).required();
