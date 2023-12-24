import { PASSWORD_PATTERN } from "utils/constant";
import * as Yup from "yup";

export const registrationSchema = Yup.object({
  EmployeeId: Yup.string().required("Employee Id is Required !"),
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string()
    .required("email is required!")
    .email("please enter a valid email"),
  password: Yup.string()
    .required("password is required!")
    .matches(PASSWORD_PATTERN, "the password at least should be 8 characters"),
  confirmPassword: Yup.string()
    .required("confirm the password please")
    .matches(PASSWORD_PATTERN, "the password at least should be 8 characters"),
}).required();
