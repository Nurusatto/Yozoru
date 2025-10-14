import { Link } from "@tanstack/react-router";
import styles from "./friend.module.scss";
import type { ReactNode } from "react";

type prop = {
  children: ReactNode;
};

export const Friend = ({ children }: prop) => {
  return (
    <main>
      <div className={styles.FriendWrap}>
        <Link
          to="/friend"
          className={styles.FriendLinks}
          activeProps={{ className: styles.isActive }}
          activeOptions={{ exact: true }}
        >
          Friends
        </Link>
        <Link
          to="/friend/add"
          className={styles.FriendLinks}
          activeProps={{ className: styles.isActive }}
          activeOptions={{ exact: true }}
        >
          Discover
        </Link>
      </div>
      {children}
    </main>
  );
};
