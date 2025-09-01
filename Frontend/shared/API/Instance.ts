import axios from "axios";

import { api_url, prefix } from "@/app/config/API";

import { useAuthStore } from "@/app/provider/store/authStore";

export const API = axios.create({
  baseURL: api_url,
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        // refresh по cookie
        const { data } = await API.get(prefix.auth.getAccessTokenUser);

        // обновляем token в zustand
        useAuthStore.getState().setToken(data.accessToken);

        // повторяем запрос с новым токеном
        error.config.headers.Authorization = `Bearer ${data.accessToken}`;
        return API.request(error.config);
      } catch (refreshError) {
        // если refresh тоже не удался → разлогиниваем юзера
        useAuthStore.getState().logout();
      }
    }
    return Promise.reject(error);
  }
);
