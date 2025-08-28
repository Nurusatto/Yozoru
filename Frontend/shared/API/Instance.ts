import axios from "axios";

import { api_url } from "@/app/config/API";

export const API = axios.create({
  baseURL: api_url,
  withCredentials: true,
});
