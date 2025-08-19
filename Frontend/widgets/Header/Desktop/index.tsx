import { Link } from "@tanstack/react-router";
import styles from "./header.module.scss";

import Logo from "@svg/logo.svg?react";
import Home from "@svg/Home.svg?react";
import Message from "@svg/Mes.svg?react";

export const HeaderDesktop = () => {
  return (
    <>
      <header className={styles.Header}>
        <div className={styles.HeaderBody}>
          <Logo width={50} height={50} />
          <nav className={styles.HeaderNav}>
            <Link
              to="/"
              activeProps={{ className: styles.HeaderNavItemActive }}
              className={styles.HeaderNavItem}
            >
              <Home />
              <h2>Home</h2>
            </Link>

            <Link
              to="/message"
              activeProps={{ className: styles.HeaderNavItemActive }}
              className={styles.HeaderNavItem}
            >
              <Message />
              <h2>Message</h2>
            </Link>
          </nav>
        </div>
        <div className={styles.HeaderFooter}></div>
      </header>
    </>
  );
};
