import { Link } from "@tanstack/react-router";
import styles from "./header.module.scss";
import Logo from "@svg/logo.svg?react";
import { useAuthStore } from "@/app/provider/store/authStore";
import clsx from "clsx";
import Settings from "@svg/settings.svg?react";
import LogOut from "@svg/logOut.svg?react";
import { useState } from "react";
import { navLinks } from "@/app/config/navLinks";

export const HeaderDesktop = () => {
  const [dropMenu, setDropMenu] = useState(false);
  const { user } = useAuthStore();

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
                className={clsx(styles.HeaderNavItem)}
              >
                <Icon />
                <h2>{label}</h2>
              </Link>
            ))}
          </nav>
        </div>
        <div className={clsx(styles.HeaderUser)}>
          <div className={clsx(styles.HeaderUserInfo)}>
            <h1 className="h1">{user?.login ?? "User"}</h1>
            <h2 className="h2">UID: {user?.id ?? " Guest"}</h2>
          </div>
          <div className={styles.HeaderAction}>
            <LogOut className={styles.HeaderActionLogOut} />
            <Settings
              height={20}
              width={20}
              onClick={() => setDropMenu(!dropMenu)}
              className={clsx(dropMenu && styles.HeaderActionSpin)}
            />
          </div>
        </div>
      </header>
    </>
  );
};
