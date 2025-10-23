import { Link } from "@tanstack/react-router";
import styles from "./header.module.scss";
import Logo from "@svg/logo.svg?react";
import { useAuthStore } from "@/app/provider/store/authStore";
import clsx from "clsx";
import LogOut from "@svg/logOut.svg?react";
import { useState } from "react";
import { navLinks } from "@/app/config/navLinks";
import { useSocketStore } from "@/app/provider/store/socketStore";

import DefaultAvatar from "@/shared/images/default/avatar.svg?react";
import { Button } from "@/shared/ui/ButtonBase";
import { useLogOut } from "../model/query";

export const HeaderDesktop = () => {
  const [dropMenu, setDropMenu] = useState<boolean>(false);
  const { user, isInitialized } = useAuthStore();

  const logOutMutation = useLogOut();

  const { isConnected } = useSocketStore();

  if (!isInitialized) return <p>Loading...</p>;

  return (
    <>
      <header className={clsx(styles.Header)}>
        <div className={clsx(styles.HeaderBody)}>
          <Logo width={50} height={50} />
          <nav className={clsx(styles.HeaderNav)}>
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link
                key={label}
                to={to}
                activeProps={{ className: styles.HeaderNavItemActive }}
                className={clsx(
                  styles.HeaderNavItem,
                  label === "Settings" && styles.HeaderSettings
                )}
              >
                <Icon className={styles.HeaderNavItemIcon} />
                <h2>{label}</h2>
              </Link>
            ))}
          </nav>
        </div>
        <div className={clsx(styles.HeaderUser)}>
          <div className={clsx(styles.HeaderUserBlock)}>
            <div className={styles.HeaderUserWrap}>
              {user?.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt=""
                  className={styles.HeaderUserAvatar}
                />
              ) : (
                <DefaultAvatar className={styles.HeaderUserAvatar} />
              )}
              <span
                className={clsx(
                  styles.HeaderOnlineDot,
                  isConnected && styles.isActive
                )}
              ></span>
            </div>
            <div className={styles.HeaderUserInfo}>
              <span className="h1">{user?.login ?? "User"}</span>
              <p className={styles.HeaderUserInfoId}>
                @{user?.UID ?? " Guest"}
              </p>
            </div>
          </div>
          <div className={styles.HeaderAction}>
            <div
              className={clsx(
                styles.HeaderActionMenu,
                dropMenu && styles.isActive
              )}
            >
              <Button
                className={clsx(styles.HeaderBtn, styles.HeaderBtnOut)}
                onClick={() => logOutMutation.mutate()}
              >
                Log Out
              </Button>
              <Button
                className={styles.HeaderBtn}
                onClick={() => setDropMenu(!dropMenu)}
              >
                Cancel
              </Button>
            </div>
            <LogOut
              className={styles.HeaderLogOut}
              onClick={() => setDropMenu(!dropMenu)}
            />
          </div>
        </div>
      </header>
    </>
  );
};
