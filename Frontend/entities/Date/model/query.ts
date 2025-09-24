import { useQuery } from "@tanstack/react-query";
import { getTimeZone, getDate } from "./API";

export const useTimeZoneQuery = (
  coords?: { lat: number; lon: number } | null
) => {
  return useQuery({
    queryKey: ["getTZ"],
    queryFn: () => getTimeZone(coords!.lat, coords!.lon),
    enabled: !!coords,
  });
};

export const useDateQuery = (TimeZone?: string) => {
  return useQuery({
    queryKey: ["getDate"],
    queryFn: () => getDate(TimeZone!),
    enabled: !!TimeZone,
  });
};
