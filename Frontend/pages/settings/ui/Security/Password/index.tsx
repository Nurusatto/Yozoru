import { usePassword } from "@/pages/settings/model/query";
import { Button } from "@/shared/ui/ButtonBase";
import { Input } from "@/shared/ui/input";
import { useForm } from "react-hook-form";

import type { passwordData } from "../../../model/types/password";

import styles from "./style.module.scss";
import { toast } from "react-toastify";

export const Password = () => {
  const { register, handleSubmit, reset } = useForm<passwordData>({
    mode: "onSubmit",
  });
  const { isPending, mutateAsync, error, isError } = usePassword();

  const onSubmit = (dataForm: passwordData) => {
    reset();
    mutateAsync(dataForm, {
      onSuccess: (data) => {
        toast.success(data?.message);
      },
    });
  };

  return (
    <section className={styles.FormWrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.FormInner}>
        <h1 className={styles.FormTitle}>Change Password</h1>
        <Input
          placeholder="Old password"
          type="password"
          {...register("oldPassword")}
        />
        <Input
          placeholder="New password"
          type="password"
          {...register("newPassword")}
        />
        <Input
          placeholder="Confirm password"
          type="password"
          {...register("confirmPassword")}
        />
        {isError && (
          <span className={styles.FormFail}>
            {error?.response?.data?.message[0]}
          </span>
        )}
        <Button type="submit" className={styles.FormBtn}>
          {isPending ? "сохранение..." : "Сохранить"}
        </Button>
      </form>
    </section>
  );
};
