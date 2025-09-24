import { useEffect, useState, useCallback } from "react";

type Coords = {
  latitude: number;
  longitude: number;
};

export const useLocation = () => {
  const [coords, setCoords] = useState<Coords | undefined>();
  const [error, setError] = useState<string | null>(null);

  // флаги загрузки
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const hasCoords = Boolean(coords);

  const requestLocation = useCallback((isRefetch = false) => {
    if (!("geolocation" in navigator)) {
      setError("Ваш браузер не поддерживает определение местоположения");
      setIsInitialLoading(false);
      return;
    }

    if (isRefetch) {
      setIsFetching(true);
    } else {
      setIsInitialLoading(true);
    }

    navigator.geolocation.getCurrentPosition(
      (geo) => {
        const { latitude, longitude } = geo.coords;
        setCoords({ latitude, longitude });
        setError(null);
        setIsInitialLoading(false);
        setIsFetching(false);
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
        setIsInitialLoading(false);
        setIsFetching(false);
      }
    );
  }, []);

  useEffect(() => {
    requestLocation(); // первая загрузка
    console.log("location used");
  }, [requestLocation]);

  return {
    coords,
    error,
    isInitialLoading,
    isFetching,
    hasCoords,
    requestLocation,
  };
};

// import { useEffect, useState } from "react";

// type Coords = {
//   latitude: number;
//   longitude: number;
// };

// export const useLocation = () => {
//   const [coords, setCoords] = useState<Coords | undefined>();
//   const [error, setError] = useState<string | null>(null);
//   const [isInitialLoading, setIsInitialLoading] = useState(true);

//   useEffect(() => {
//     if (!("geolocation" in navigator)) {
//       setError("Ваш браузер не поддерживает определение местоположения");
//       setIsInitialLoading(false);
//       return;
//     }

//     setIsInitialLoading(true);

//     const watchId = navigator.geolocation.watchPosition(
//       (geo) => {
//         setCoords({
//           latitude: geo.coords.latitude,
//           longitude: geo.coords.longitude,
//         });
//         setError(null);
//         setIsInitialLoading(false);
//       },
//       (err) => {
//         let message = "Не удалось определить местоположение";

//         switch (err.code) {
//           case err.PERMISSION_DENIED:
//             message = "Вы запретили доступ к геолокации";
//             break;
//           case err.POSITION_UNAVAILABLE:
//             message = "Информация о местоположении недоступна";
//             break;
//           case err.TIMEOUT:
//             message = "Превышено время ожидания ответа от GPS";
//             break;
//         }

//         setError(message);
//         setIsInitialLoading(false);
//       }
//     );

//     return () => {
//       navigator.geolocation.clearWatch(watchId);
//     };
//   }, []);

//   return {
//     coords,
//     error,
//     isInitialLoading,
//   };
// };  2
