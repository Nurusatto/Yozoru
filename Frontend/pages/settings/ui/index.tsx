import { Link } from "@tanstack/react-router";
import styles from "./style.module.scss";
import type { ReactNode } from "react";

type prop = {
  children: ReactNode;
};

export const Settings = ({ children }: prop) => {
  return (
    <main>
      <div className={styles.SettingsPage}>
        <nav className={styles.SettingsNav}>
          <Link
            to="/settings"
            activeProps={{ className: styles.isActive }}
            activeOptions={{ exact: true }}
            className={styles.SettingsLinks}
          >
            Main
          </Link>
          <Link
            activeProps={{ className: styles.isActive }}
            activeOptions={{ exact: true }}
            to="/settings/Security"
            className={styles.SettingsLinks}
          >
            Security
          </Link>
        </nav>
        {children}
      </div>
    </main>
  );
};
