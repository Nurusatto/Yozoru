import styles from "./style.module.scss";

//blocks
import { LogOutBlock } from "./LogOut";
import { ProfileBlock } from "./Profile";

export const SettingsMain = () => {
  return (
    <div className={styles.MainWrapper}>
      <LogOutBlock />
      <ProfileBlock />
    </div>
  );
};
