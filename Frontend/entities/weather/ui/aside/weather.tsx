import styles from "./weather.module.scss";

import { useLocation } from "@/shared/hooks/useLocation";
import { useWeatherData } from "../../model/aside/query";
import { weatherIcon } from "../../model/aside/constant";
import {
  City,
  Humdity,
  Temp,
  WeatherSVG,
  Wind,
} from "../../../../shared/svg/weather";

import type { WeatherMain } from "../../model/aside/type";
import type { renderStatus } from "@/shared/types/renderStatus";

const renderStatus = ({
  isInitialLoading,
  isFetching,
  error,
  requestLocation,
}: {
  isInitialLoading: boolean;
  isFetching: boolean;
  error: string | null;
  requestLocation: () => void;
}) => {
  if (isInitialLoading) return "Определяю координаты...";
  if (error)
    return (
      <>
        Ошибка: {error}
        <button onClick={requestLocation} className={styles.WeatherBtn}>
          Попробовать снова
        </button>
      </>
    );
  if (isFetching) return "Обновляю координаты...";
  return null;
};

export const Weather = () => {
  const {
    coords,
    error,
    isFetching,
    isInitialLoading,
    hasCoords,
    requestLocation,
  } = useLocation();

  const weatherQuery = useWeatherData(
    coords ? { lat: coords.latitude, lon: coords.longitude } : undefined
  );

  const main: string = weatherQuery.data?.weather[0]?.main;

  return (
    <div className={styles.Weather}>
      <div className={styles.WeatherHead}>
        {renderStatus({ isInitialLoading, isFetching, error, requestLocation })}
        {hasCoords && weatherQuery.data && (
          <img
            className={styles.WeatherImg}
            src={
              main in weatherIcon
                ? weatherIcon[main as WeatherMain]
                : weatherIcon.Default
            }
            alt=""
          />
        )}
      </div>
      <div className={styles.WeatherBody}>
        {weatherQuery.isLoading && <span>Loading...</span>}
        {weatherQuery.error && (
          <span>Ошибка: {String(weatherQuery.error)}</span>
        )}
        {hasCoords && weatherQuery.data && (
          <>
            <span>
              <City />
              Город: {weatherQuery.data.name}
            </span>
            <span>
              <WeatherSVG />
              Погода: {weatherQuery.data.weather[0].description}
            </span>
            <span>
              <Temp />
              Температура: {weatherQuery.data.main.temp}
              (ощущается как {weatherQuery.data.main.feels_like})
            </span>
            <span>
              <Wind />
              Ветер: {weatherQuery.data.wind.speed} м/с
            </span>

            <span>
              <Humdity />
              Влажность: {weatherQuery.data.main.humidity}%
            </span>
          </>
        )}
      </div>
    </div>
  );
};
