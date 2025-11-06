import { navLinksFooter } from "@/app/config/navLinks";
import clsx from "clsx";
import styles from "./style.module.scss";
import { Link } from "@tanstack/react-router";

export const FooterTablet = () => {
  return (
    <>
      <footer className={styles.Footer}>
        {navLinksFooter.map(({ to, label, icon: Icon }) => (
          <Link
            key={label}
            to={to}
            activeProps={{ className: styles.FooterNavItemActive }}
            className={clsx(
              styles.FooterNavItem,
              label === "Settings" && styles.FooterSettings
            )}
          >
            <Icon className={styles.HeaderNavItemIcon} />
          </Link>
        ))}
      </footer>
    </>
  );
};
