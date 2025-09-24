import { useLocation } from "@/shared/hooks/useLocation";
import { useDateQuery, useTimeZoneQuery } from "../../model/query";
import type { renderStatus } from "@/shared/types/renderStatus";
import type { InformativeItem } from "../../model/type";
import { Clock } from "../../model/clock";

import styles from "./Date.module.scss";
import { Button } from "@/shared/ui/ButtonBase";

const renderStatus = ({
  isInitialLoading,
  error,
  isFetching,
  requestLocation,
}: renderStatus) => {
  if (isInitialLoading) return "Определяю координаты...";
  if (error)
    return (
      <>
        Ошибка: {error}
        <Button onClick={requestLocation} className={styles.DateBtn}>
          Попробовать снова
        </Button>
      </>
    );
  if (isFetching) return "Обновляю местоположение...";
  return null;
};

export const DateAside = () => {
  const { coords, isFetching, isInitialLoading, requestLocation, error } =
    useLocation();

  const TimeZoneQuery = useTimeZoneQuery(
    coords ? { lat: coords.latitude, lon: coords.longitude } : undefined
  );

  const Tz = TimeZoneQuery.data?.localityInfo?.informative?.find(
    (item: InformativeItem) => item.description === "часовой пояс"
  )?.name;

  const DateQuery = useDateQuery(Tz);
  const getTime = DateQuery.data?.datetime;

  return (
    <div className={styles.Date}>
      {renderStatus({
        isFetching,
        isInitialLoading,
        error,
        requestLocation,
      })}

      {!isInitialLoading && !error && <Clock startTime={getTime} />}
    </div>
  );
};
