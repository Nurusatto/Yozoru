//ui
import { Input } from "@/shared/ui/input";
import styles from "./styles.module.scss";
import { Button } from "@/shared/ui/ButtonBase";
//svg
import Google from "@svg/socials/google.svg?react";
//model
import { useForm } from "react-hook-form";
import type { FormProps, message } from "../model/type";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../model/validations";
import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { loginUser, loginVerify } from "../model/API";
import clsx from "clsx";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { useAuthStore } from "@/app/provider/store/authStore";
import { api_url, prefix } from "@/app/config/API";

export const Auth = () => {
  const [block, setBlock] = useState(false);
  const [alert, setAlert] = useState<string | undefined>();
  const [succes, setSucces] = useState<boolean>();
  const navigate = useNavigate({ from: "/auth/login" });
  const { setToken, setUser } = useAuthStore();

  const {
    reset,
    getValues,
    trigger,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormProps>({
    mode: "onSubmit",
    resolver: yupResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setAlert(data.message);
      setSucces(true);
    },
    onError: (err: AxiosError<message>) => {
      console.log(err);
      setAlert(err.response?.data.message);
      setSucces(false);
    },
  });

  const loginVerifyMutation = useMutation({
    mutationFn: loginVerify,
    onSuccess: (data) => {
      setToken(data.accesToken);
      setUser(data.user);
      navigate({ to: "/" });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const resetForm = () => {
    setBlock(false);
    reset();
  };

  const onSubmit = async (data: FormProps) => {
    const newData = {
      email: data.email,
      code: data.code,
    };
    loginVerifyMutation.mutate(newData);
  };

  const handlelogin = async () => {
    const isValid = await trigger(["email", "password"]);
    if (!isValid) return;
    setBlock(true);
    const { email, password } = getValues();
    loginMutation.mutate({ email, password });
  };

  const GoogleVerify = () =>
    (window.location.href = api_url + prefix.social.google.auth);

  return (
    <div className={styles.Auth}>
      <h1>YOZORA</h1>
      <Button className={styles.AuthButtonGoogle} onClick={GoogleVerify}>
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
          className={clsx(styles.AuthFormInput, block && styles.AuthFormBlock)}
          id="email"
          disabled={block}
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
          className={clsx(styles.AuthFormInput, block && styles.AuthFormBlock)}
          id="password"
          disabled={block}
          {...register("password")}
        />
        {errors.password && (
          <span style={{ color: "red" }}>Please change your password</span>
        )}
        <div className={styles.AuthFormAction}>
          <Input placeholder="code" {...register("code")} />
          <Button
            className={styles.AuthFormCodeButton}
            type="button"
            onClick={handlelogin}
          >
            Code
          </Button>
        </div>

        {errors.code && <span style={{ color: "red" }}>invalid code</span>}
        {alert && (
          <span style={{ color: succes ? "green" : "red" }}>{alert}</span>
        )}

        <Button type="submit" className={styles.AuthButtonSubmit}>
          {isSubmitting ? "Loading..." : "Login"}
        </Button>
        <Button
          type="button"
          className={styles.AuthButtonSubmit}
          onClick={resetForm}
        >
          Изменить данные
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
