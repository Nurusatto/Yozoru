import { useEffect, useState, useCallback } from "react";

type Coords = {
  latitude: number;
  longitude: number;
};

export const useLocation = () => {
  const [coords, setCoords] = useState<Coords | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const requestLocation = useCallback(() => {
    if (!("geolocation" in navigator)) {
      setError("Ваш браузер не поддерживает определение местоположения");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (geo) => {
        const { latitude, longitude } = geo.coords;
        setCoords({ latitude, longitude });
        setError(null);
        setLoading(false);
      },
      (err) => {
        let message = "Не удалось определить местоположение";

        switch (err.code) {
          case err.PERMISSION_DENIED:
            message = "Вы запретили доступ к геолокации";
            break;
          case err.POSITION_UNAVAILABLE:
            message = "Информация о местоположении недоступна";
            break;
          case err.TIMEOUT:
            message = "Превышено время ожидания ответа от GPS";
            break;
        }

        setError(message);
        setLoading(false);
      }
    );
  }, []);

  useEffect(() => {
    requestLocation();
    console.log("location used");
  }, [requestLocation]);

  return { coords, error, loading, requestLocation };
};
