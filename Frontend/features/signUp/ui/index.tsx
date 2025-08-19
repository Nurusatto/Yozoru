import { Input } from "@/shared/ui/input";
import styles from "./style.module.scss";
import { Button } from "@/shared/ui/ButtonBase";
import type { SignUpProps } from "../model/type";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpShema } from "../model/validations";

import { SendCode, registerUser } from "../model/API";

export const SignUp = () => {
  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpProps>({
    mode: "onSubmit",
    resolver: yupResolver(SignUpShema),
  });

  const handleSentCode = async () => {
    const emailValue = getValues("email");
    if (!emailValue) return;
    await SendCode(emailValue);
  };

  const onSubmit = async (data: SignUpProps) => {
    const res = await registerUser(data);
    console.log(res.data);
  };

  return (
    <div className={styles.SignUp}>
      <h1>Создайте учетную запись</h1>
      <form className={styles.SignUpForm} onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="email"
          className={styles.SignUpFormInput}
          {...register("email")}
        />
        {errors.email && (
          <span style={{ color: "red" }}>Please enter correct email</span>
        )}
        <Input
          placeholder="login"
          className={styles.SignUpFormInput}
          {...register("login")}
        />
        {errors.login && (
          <span style={{ color: "red" }}>Please enter correct login</span>
        )}
        <Input
          placeholder="password"
          className={styles.SignUpFormInput}
          type="password"
          {...register("password")}
        />
        {errors.password && (
          <span style={{ color: "red" }}>Please enter correct password</span>
        )}
        <div className={styles.SignUpFormAction}>
          <Input
            placeholder="cod"
            className={styles.SignUpFormInput}
            {...register("code")}
          />
          <Button
            className={styles.SignUpFormActionButton}
            type="button"
            onClick={handleSentCode}
          >
            Code
          </Button>
          {errors.code && <span style={{ color: "red" }}>введите код</span>}
        </div>
        <Button className={styles.SignUpFormButton} type="submit">
          {isSubmitting ? "Loading" : "Sign Up"}
        </Button>
      </form>
    </div>
  );
};
