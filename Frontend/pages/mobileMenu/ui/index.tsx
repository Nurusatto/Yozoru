import { navLinkMenu } from "@/app/config/navLinks";
import { Link } from "@tanstack/react-router";

import styles from "./style.module.scss";
import { Weather } from "@/entities/weather";

export const MobileMenu = () => {
  return (
    <main>
      <h1 className={styles.MenuTitle}>YOZORU</h1>
      <Weather />
      <div className={styles.MenuList}>
        {navLinkMenu.map(({ to, label, icon: Icon }) => (
          <Link key={label} to={to} className={styles.MenuNavItem}>
            <Icon className={styles.HeaderNavItemIcon} />
          </Link>
        ))}
      </div>
    </main>
  );
};
