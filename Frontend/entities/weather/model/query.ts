import { useQuery } from "@tanstack/react-query";
import { getWeather } from "./API";

export const useWeatherData = (
  coords?: { lat: number; lon: number } | null
) => {
  return useQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather(coords!.lat, coords!.lon),
    enabled: !!coords,
  });
};
