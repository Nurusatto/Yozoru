import type { ReactNode } from "react";
import styles from "./authLayout.module.scss";

type prop = {
  children: ReactNode;
};

export const AuthLayout = ({ children }: prop) => {
  return <div className={styles.AuthLayout}>{children}</div>;
};
