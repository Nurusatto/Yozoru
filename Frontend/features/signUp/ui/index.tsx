import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/ButtonBase";
import styles from "./style.module.scss";
//form
import type { SignUpProps } from "../model/type";
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

export const SignUp = () => {
  const [alert, setAlert] = useState<string | null>();
  const { setUser, setToken } = useAuthStore();
  const navigate = useNavigate({ from: "/auth/signUp" });
  const [block, setBlock] = useState(false);

  const {
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
    onError: () => setAlert("Ошибка регистрации"),
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
    <div className={styles.SignUp}>
      <h1>Создайте учетную запись</h1>
      <form className={styles.SignUpForm} onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="email"
          className={styles.SignUpFormInput}
          {...register("email")}
          disabled={block}
        />
        {errors.email && (
          <span style={{ color: "red" }}>Please enter correct email</span>
        )}
        <Input
          placeholder="login"
          className={styles.SignUpFormInput}
          {...register("login")}
          disabled={block}
        />
        {errors.login && (
          <span style={{ color: "red" }}>Please enter correct login</span>
        )}
        <Input
          placeholder="password"
          className={styles.SignUpFormInput}
          type="password"
          disabled={block}
          {...register("password")}
        />
        {errors.password && (
          <span style={{ color: "red" }}>Please enter correct password</span>
        )}
        <div className={styles.SignUpFormAction}>
          <div className={styles.SignUpFormActionCod}>
            <Input
              placeholder="cod"
              className={styles.SignUpFormInput}
              {...register("code")}
            />
            <Button
              className={styles.SignUpFormActionButton}
              type="button"
              onClick={handleRegister}
            >
              Code
            </Button>
          </div>
          <div className={styles.SignUpFormActionAlert}>
            {errors.code && (
              <span style={{ color: "red" }}>enter correct code</span>
            )}
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
        <Button className={styles.SignUpFormButton} type="submit">
          {isSubmitting ? "Loading" : "Sign Up"}
        </Button>
      </form>
    </div>
  );
};
