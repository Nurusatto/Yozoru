import Clear from "@/shared/images/weather/clear.gif";
import Cloud from "@/shared/images/weather/cloud.gif";
import Rain from "@/shared/images/weather/rain.gif";
import Snow from "@/shared/images/weather/snow.gif";
import Thunder from "@/shared/images/weather/thunder.gif";
import Default from "@/shared/images/weather/default.gif";

import type { WeatherMain } from "./type";

export const weather_key = import.meta.env.VITE_WEATHER_KEY;

export const weatherENDPOINT = {
  weather: "/weather?", //weather today
  forecast: "/forecast?", //weather 5 day
  air_pollution: "/air_pollution?", //air
  onecall: "/onecall?", //all
};

export const weatherIcon: Record<WeatherMain, string> = {
  Clear: Clear,
  Clouds: Cloud,
  Rain: Rain,
  Snow: Snow,
  Thunderstorm: Thunder,
  Drizzle: Rain,
  Mist: Rain,
  Default: Default,
};
