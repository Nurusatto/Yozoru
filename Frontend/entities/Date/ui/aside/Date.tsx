import { useLocation } from "@/shared/hooks/useLocation";
import { useDateQuery, useTimeZoneQuery } from "../../model/query";
import type { renderStatus } from "@/shared/types/renderStatus";
import type { InformativeItem } from "../../model/type";
import { Clock } from "../../model/clock";

import styles from "./Date.module.scss";

const renderStatus = ({
  isInitialLoading,
  error,
  isFetching,
}: renderStatus) => {
  if (isInitialLoading) return "Определяю координаты...";
  if (error) return <>Ошибка: {error}</>;
  if (isFetching) return "Обновляю местоположение...";
  return null;
};

export const DateAside = () => {
  const {
    coords,
    isFetching,
    isInitialLoading,

    error,
  } = useLocation();

  const TimeZoneQuery = useTimeZoneQuery(
    coords ? { lat: coords.latitude, lon: coords.longitude } : undefined
  );

  const Tz = TimeZoneQuery.data?.localityInfo?.informative?.find(
    (item: InformativeItem) => item.description === "часовой пояс"
  )?.name;

  const DateQuery = useDateQuery(Tz);
  const getTime = DateQuery.data?.currentLocalTime;

  return (
    <div className={styles.Date}>
      {renderStatus({
        isFetching,
        isInitialLoading,
        error,
      })}

      <Clock startTime={getTime} />
    </div>
  );
};
