import * as yup from "yup";

export const SignUpShema = yup.object({
  email: yup.string().email("Invalid email").required("email is required"),
  login: yup
    .string()
    .min(3, "login must be at least 3 characters")
    .required("login is required"),
  password: yup
    .string()
    .required("password is required")
    .min(6, "password must be at least 6 characters"),
  code: yup.string().min(4, "invalid code").required("code is reauired"),
});
