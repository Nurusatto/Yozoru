import { useAuthStore } from "@/app/provider/store/authStore";
import styles from "./profile.module.scss";

import ArrowLeft from "@svg/straightArrows/left.svg?react";
import Search from "@svg/searchSVG/search.svg?react";

export const MyProfile = () => {
  const { user } = useAuthStore();

  return (
    <main>
      <div className={styles.Profile}>
        <div className={styles.ProfilePromo}>
          <ArrowLeft className={styles.ProfilePromoSvg} />
          <div className={styles.ProfilePromoInfo}>
            <h1>{user?.login}</h1>
            <span>{user?.UID}</span>
          </div>
          <Search className={styles.ProfilePromoSvg} />
        </div>
      </div>
    </main>
  );
};
