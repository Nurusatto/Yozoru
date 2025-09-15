import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/ButtonBase";
import styles from "./style.module.scss";
import clsx from "clsx";
//form
import type { messageProp, SignUpProps } from "../model/type";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpShema } from "../model/validations";

//api
import { registerUser, verifyUser } from "../model/API";
import { useState } from "react";

//store / router
import { useAuthStore } from "@/app/provider/store/authStore";
import { useNavigate } from "@tanstack/react-router";

//tanstk-querry
import { useMutation } from "@tanstack/react-query";

import type { AxiosError } from "axios";

export const SignUp = () => {
  const [alert, setAlert] = useState<string | null>();
  const { setUser, setToken } = useAuthStore();
  const navigate = useNavigate({ from: "/auth/signUp" });
  const [block, setBlock] = useState(false);

  const {
    reset,
    trigger,
    getValues,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpProps>({
    mode: "onSubmit",
    resolver: yupResolver(SignUpShema),
  });

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setAlert(data.message);
    },
    onError: (err: AxiosError<messageProp>) => {
      setAlert(err.response?.data?.message || err.message);
    },
  });

  const verifyMutation = useMutation({
    mutationFn: verifyUser,
    onSuccess: (response) => {
      if (response.data.success) {
        setUser(response.data.user);
        setToken(response.data.accessToken);
        navigate({ to: "/" });
      }
    },
    onError: () => setAlert("ошибка регистрации"),
  });

  const resetForm = () => {
    setBlock(false);
    reset();
  };

  const handleRegister = async () => {
    const isValid = await trigger(["email", "login", "password"]);
    if (!isValid) return;
    setBlock(true);

    const { email, login, password } = getValues();
    const formData = { email, login, password };

    registerMutation.mutate(formData);
  };

  const onSubmit = async (data: SignUpProps) => {
    verifyMutation.mutate(data);
  };

  return (
    <div className={clsx(styles.SignUp)}>
      <h1>Создайте учетную запись</h1>
      <form
        className={clsx(styles.SignUpForm)}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          placeholder="email"
          className={clsx(
            styles.SignUpFormInput,
            block && styles.SignUpFormBlock
          )}
          {...register("email")}
          disabled={block}
        />
        {errors.email && (
          <span style={{ color: "red" }}>Please enter correct email</span>
        )}
        <Input
          placeholder="login"
          className={clsx(
            styles.SignUpFormInput,
            block && styles.SignUpFormBlock
          )}
          {...register("login")}
          disabled={block}
        />
        {errors.login && (
          <span style={{ color: "red" }}>Please enter correct login</span>
        )}
        <Input
          placeholder="password"
          className={clsx(
            styles.SignUpFormInput,
            block && styles.SignUpFormBlock
          )}
          type="password"
          disabled={block}
          {...register("password")}
        />
        {errors.password && (
          <span style={{ color: "red" }}>Please enter correct password</span>
        )}
        <div className={clsx(styles.SignUpFormAction)}>
          <div className={clsx(styles.SignUpFormActionCod)}>
            <Input
              placeholder="cod"
              className={clsx(styles.SignUpFormInput)}
              {...register("code")}
            />
            <Button
              className={clsx(styles.SignUpFormActionButton)}
              type="button"
              onClick={handleRegister}
            >
              Code
            </Button>
          </div>
          <div className={clsx(styles.SignUpFormActionAlert)}>
            {alert && (
              <span
                style={{
                  color: alert.includes("На вашу почту отправлен код!")
                    ? "green"
                    : "red",
                }}
              >
                {alert}
              </span>
            )}
          </div>
        </div>
        <Button className={clsx(styles.SignUpFormButton)} type="submit">
          {isSubmitting ? "Loading" : "Sign Up"}
        </Button>
        <Button
          className={clsx(styles.SignUpFormButton)}
          type="submit"
          onClick={resetForm}
        >
          Изменить данные
        </Button>
      </form>
    </div>
  );
};
