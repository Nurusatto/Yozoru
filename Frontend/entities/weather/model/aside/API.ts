import axios from "axios";
import { weatherENDPOINT, weather_key } from "./constant";

const { weather } = weatherENDPOINT;

export const getWeather = async (lat: number, lon: number) => {
  const res = await axios.get(
    `${import.meta.env.VITE_WEATHER_URL}${weather}lat=${lat}&lon=${lon}&appid=${weather_key}&units=metric&lang=ru`
  );
  console.log(res);
  return res.data;
};
