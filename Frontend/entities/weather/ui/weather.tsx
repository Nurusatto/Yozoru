import clsx from "clsx";
import styles from "./weather.module.scss";

import { useLocation } from "@/shared/hooks/useLocation";
import { useWeatherData } from "../model/query";

export const Weather = () => {
  const { coords } = useLocation();
  const weatherQuery = useWeatherData(
    coords ? { lat: coords.latitude, lon: coords.longitude } : undefined
  );

  if (weatherQuery.isLoading) return <div>loading</div>;

  return (
    <div className={clsx(styles.WeatherContent)}>
      <h1></h1>
    </div>
  );
};
