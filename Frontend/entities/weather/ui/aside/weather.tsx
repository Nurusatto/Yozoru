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

import type { renderStatus, WeatherMain } from "../../model/aside/type";

const renderStatus = ({ loading, error, requestLocation }: renderStatus) => {
  if (loading) return <div>Получаю координаты...</div>;
  if (error)
    return (
      <div>
        Ошибка: {error}
        <button onClick={requestLocation}>Попробовать снова</button>
      </div>
    );
};

export const Weather = () => {
  const { coords, error, loading, requestLocation } = useLocation();

  const weatherQuery = useWeatherData(
    coords ? { lat: coords.latitude, lon: coords.longitude } : undefined
  );

  const main: string = weatherQuery.data?.weather[0]?.main;

  return (
    <div className={styles.Weather}>
      <div className="WeatherHead">
        {renderStatus({ error, loading, requestLocation })}
        {weatherQuery.data && (
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
        {weatherQuery.data && (
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
