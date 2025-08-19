//ui
import { Input } from "@/shared/ui/input";
import styles from "./styles.module.scss";
import { Button } from "@/shared/ui/ButtonBase";
//svg
import Google from "@svg/socials/google.svg?react";
//model
import { useForm } from "react-hook-form";
import type { FormProps } from "../model/type";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../model/validations";
import { Link } from "@tanstack/react-router";

export const Auth = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormProps>({
    mode: "onSubmit",
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: FormProps) => console.log(data);

  return (
    <div className={styles.Auth}>
      <h1>YOZORA</h1>
      <Button className={styles.AuthButtonGoogle}>
        <Google />
        Sign in with Google
      </Button>
      <div className={styles.AuthDivider}>
        <div className={styles.AuthDividerLine}></div>
        <span>ИЛИ</span>
        <div className={styles.AuthDividerLine}></div>
      </div>
      <form
        action=""
        className={styles.AuthForm}
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="email" className="h2">
          Email
        </label>
        <Input
          placeholder="email"
          type="email"
          className={styles.AuthFormInput}
          id="email"
          {...register("email")}
        />
        {errors.email && (
          <span style={{ color: "red" }}>Please enter correct email</span>
        )}
        <label htmlFor="password" className="h2">
          Password
        </label>
        <Input
          placeholder="password"
          type="password"
          className={styles.AuthFormInput}
          id="password"
          {...register("password")}
        />
        {errors.password && (
          <span style={{ color: "red" }}>Please change your password</span>
        )}

        <Button type="submit" className={styles.AuthButtonSubmit}>
          {isSubmitting ? "Loading..." : "Login"}
        </Button>
        <Link to="/auth/signUp">
          <span className={styles.AuthButtonSignUp}>No account? Join us!</span>
        </Link>
        <Link to="/auth/ForgotPassword">
          <span className={styles.AuthButtonForgotPassword}>
            Forgot password?
          </span>
        </Link>
      </form>
    </div>
  );
};
