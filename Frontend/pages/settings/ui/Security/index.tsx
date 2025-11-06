import { Password } from "./Password";
import styles from "./style.module.scss";

export const SettingsSecurity = () => {
  return (
    <div className={styles.Wrapper}>
      <Password />
    </div>
  );
};
