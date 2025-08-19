import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().email("Invalid email").required("email is required"),
  password: yup
    .string()
    .required("password is required")
    .min(6, "password must be at least 6 characters"),
});
