import { Button } from "@/shared/ui/ButtonBase";
import LogOut from "@svg/logOut.svg?react";
import clsx from "clsx";
import styles from "./style.module.scss";
import { useState } from "react";
import { useLogOut } from "../../../model/query";

export const LogOutBlock = () => {
  const [dropMenu, setDropMenu] = useState<boolean>();

  const logOutMutation = useLogOut();
  return (
    <div className={styles.LogOut}>
      <h1 className={styles.LogOutTitle}>Выйти с аккаута?</h1>
      <LogOut
        className={clsx(styles.LogOutSvg, dropMenu && styles.isActive)}
        onClick={() => setDropMenu(!dropMenu)}
      />
      <div className={clsx(styles.LogOutMenu, dropMenu && styles.isActive)}>
        <Button
          className={clsx(styles.LogOutBtn, styles.LogOutBtnOut)}
          onClick={() => logOutMutation.mutate()}
        >
          Log Out
        </Button>
        <Button
          className={styles.LogOutBtn}
          onClick={() => setDropMenu(!dropMenu)}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};
