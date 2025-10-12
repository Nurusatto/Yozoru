import { useAuthStore } from "@/app/provider/store/authStore";
import styles from "./profile.module.scss";

import { useRouter } from "@tanstack/react-router";

import ArrowLeft from "@svg/straightArrows/left.svg?react";
import Search from "@svg/searchSVG/search.svg?react";

import DefaultAvatar from "@/shared/images/default/avatar.svg?react";

export const MyProfile = () => {
  const { user } = useAuthStore();
  const router = useRouter();
  const isBanner = user?.bannerUrl;

  const handleBack = () => {
    if (window.history.length > 1) {
      router.history.back();
    } else {
      router.navigate({ to: "/" });
    }
  };

  return (
    <main>
      <div className={styles.Profile}>
        <div className={styles.ProfilePromo}>
          <div className={styles.ProfilePromoLeft}>
            <ArrowLeft
              className={styles.ProfilePromoSvg}
              onClick={handleBack}
            />
            <div className={styles.ProfilePromoInfo}>
              <h1>{user?.login}</h1>
              <span>Просмотров:{user?.id}</span>
            </div>
          </div>
          <Search
            className={styles.ProfilePromoSvg}
            onClick={() => router.navigate({ to: "/friend" })}
          />
        </div>
        <div className={styles.ProfileHeader}>
          <div className={styles.ProfileBanner}>
            {isBanner && (
              <img
                src={user?.bannerUrl}
                className={styles.ProfileBannerImg}
                alt=""
              />
            )}
          </div>
          <div className={styles.ProfileAvatarWrapper}>
            {user?.avatarUrl ? (
              <img
                className={styles.ProfileAvatar}
                src={user?.avatarUrl}
                alt="User avatar"
              />
            ) : (
              <DefaultAvatar className={styles.ProfileAvatar} />
            )}
          </div>
        </div>
        <div className={styles.ProfileInfo}>
          <h2 className={styles.ProfileInfoName}>{user?.login}</h2>
          <p className={styles.ProfileInfoId}>{user?.UID}</p>
        </div>
      </div>
    </main>
  );
};
