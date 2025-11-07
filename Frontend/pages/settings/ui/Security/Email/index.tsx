import { useForm } from "react-hook-form";
import styles from "./style.module.scss";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/ButtonBase";
import { useState } from "react";
import { useEmail, useEmailVerify } from "@/pages/settings/model/query";
import type { emailVerify } from "@/pages/settings/model/types/email";
import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";

export const Email = () => {
  const queryClient = useQueryClient();
  const [block, setBlock] = useState<boolean>();
  const {
    mutate,
    isError,
    isSuccess,
    data,
    error,
    reset: resetEmail,
  } = useEmail();
  const {
    mutate: mutateVerify,
    isSuccess: isSuccesVerify,
    error: errorVerify,
    isError: isErrorVerify,
    data: dataVerify,
    reset: resetEmailVerify,
  } = useEmailVerify();

  const { register, handleSubmit, getValues, reset } = useForm<emailVerify>({
    mode: "onSubmit",
  });

  const ClearForm = () => {
    reset();
    setBlock(false);
  };

  const onSubmit = (FormData: emailVerify) => {
    resetEmail();
    resetEmailVerify();
    mutateVerify(FormData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["me"] });
        resetEmail();
        resetEmailVerify();
        ClearForm();
      },
    });
  };

  const handleEmail = () => {
    resetEmail();
    setBlock(true);
    const emailValue = getValues("newEmail");
    mutate({ newEmail: emailValue });
  };

  return (
    <section className={styles.EmailWrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.EmailForm}>
        <Input
          placeholder="New email"
          {...register("newEmail")}
          disabled={block}
          className={clsx(block && styles.EmailBlocked)}
        />
        <div className={styles.EmailAction}>
          <Input
            placeholder="Code"
            {...register("code", { valueAsNumber: true })}
          />
          <Button
            type="button"
            className={styles.EmailBtnCode}
            onClick={handleEmail}
          >
            Code
          </Button>
        </div>
        {isSuccess && !isSuccesVerify && <span>{data.message}</span>}
        {isSuccesVerify && <span>{dataVerify?.message}</span>}

        {isError && <span>{error.response?.data.message[0]}</span>}
        {isErrorVerify && <span>{errorVerify.response?.data.message[0]}</span>}
        <Button className={styles.EmailBtn} type="submit">
          Сохранить
        </Button>
        <Button className={styles.EmailBtn} type="button" onClick={ClearForm}>
          Изменить данные
        </Button>
      </form>
    </section>
  );
};
