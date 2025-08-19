import styles from "./mainLayout.module.scss";
import type { ReactNode } from "react";

type prop = {
  children: ReactNode;
};

export const MainLayout = ({ children }: prop) => {
  return <div className={styles.MainLayout}>{children}</div>;
};
