export type renderStatus = {
  loading: boolean;
  error: string | null;
  requestLocation: () => void;
};

export type WeatherMain =
  | "Clear" //
  | "Clouds" //
  | "Rain" //
  | "Snow" //
  | "Thunderstorm" //
  | "Drizzle"
  | "Mist"
  | "Default";
