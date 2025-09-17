import { useEffect, useState } from "react";

type Coords = {
  latitude: number;
  longitude: number;
};

export const useLocation = () => {
  const [coords, setCoords] = useState<Coords | undefined>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (geo) => {
          const { latitude, longitude } = geo.coords;
          setCoords({ latitude, longitude });
        },
        (err) => setError(err.message)
      );
    } else {
      setError("Геолокация не поддерживается");
    }
  }, []);

  return { coords, error };
};
