import { Weather } from "@/entities/weather";
import styles from "./aside.module.scss";

export const Aside = () => {
  return (
    <aside className={styles.Aside}>
      <Weather />
    </aside>
  );
};
