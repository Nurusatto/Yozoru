import { url, DateUrl } from "./constant";
import axios from "axios";

export const getTimeZone = async (lat: number, lon: number) => {
  const res = await axios.get(
    `${url}latitude=${lat}&longitude=${lon}&localityLanguage=ru`
  );

  return res.data;
};

export const getDate = async (TimeZone: string) => {
  const res = await axios.get(`${DateUrl}${TimeZone}`);
  console.log(res);
  return res.data;
};
