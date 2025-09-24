import { Weather } from "@/entities/weather";
import styles from "./aside.module.scss";
import { DateAside } from "@/entities/Date/";

export const AsideWidget = () => {
  return (
    <aside className={styles.Aside}>
      <Weather />
      <DateAside />
    </aside>
  );
};
