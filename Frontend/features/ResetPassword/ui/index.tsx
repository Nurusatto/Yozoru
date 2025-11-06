import { Button } from "@/shared/ui/ButtonBase";
import { Input } from "@/shared/ui/input";

import styles from "./style.module.scss";
import { useState } from "react";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import type { ResetForm } from "../model/type";

import { useQuerryCode, useQuerryVerify } from "../model/query";
import { useNavigate } from "@tanstack/react-router";

export const ResetPassword = () => {
  const [block, setBlock] = useState<boolean>(false);
  const queryCode = useQuerryCode();
  const queryVerify = useQuerryVerify();
  const navigate = useNavigate();

  const { getValues, register, handleSubmit, reset } = useForm<ResetForm>({
    mode: "onSubmit",
  });

  const handlerClear = () => {
    setBlock(false);
    reset();
  };

  const handlerCode = () => {
    const email = getValues("email");
    setBlock(true);
    queryCode.mutate(email);
  };

  const onSubmit = async () => {
    queryCode.reset();
    const { code, email } = getValues();
    const result = await queryVerify.mutateAsync({ email, code });
    navigate({
      to: "/auth/login",
      search: { reset: "true", message: result.message },
    });
  };

  return (
    <form className={styles.ResetWrapper} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={styles.ResetLogo}>YOZORA</h1>
      <div className={styles.ResetAction}>
        <Input
          placeholder="Email"
          className={clsx(styles.ResetInput, block && styles.ResetBlocked)}
          type="email"
          disabled={block}
          {...register("email")}
        />
        <div className={styles.ResetVerify}>
          <Input
            placeholder="code"
            type="number"
            className={styles.ResetInput}
            {...register("code")}
          />
          <Button className={styles.ResetBtn} onClick={handlerCode}>
            Code
          </Button>
        </div>
        {queryCode.data?.message &&
          queryCode.data?.success &&
          block &&
          !queryVerify.isPending && (
            <span className={styles.ResetSucces}>{queryCode.data.message}</span>
          )}
        {queryCode.isError && block && !queryVerify.isPending && (
          <span className={styles.ResetFail}>
            {queryCode.error?.response?.data?.message}
          </span>
        )}
        {queryVerify.isError && queryVerify.error && block && (
          <span className={styles.ResetFail}>
            {queryVerify.error?.response?.data?.message}
          </span>
        )}
      </div>
      <Button className={styles.ResetBtn} type="submit">
        Изменить пароль
      </Button>
      <Button className={styles.ResetBtn} onClick={handlerClear} type="button">
        Изменить данные
      </Button>
    </form>
  );
};
