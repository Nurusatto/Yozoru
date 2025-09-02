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
    const originalRequest = error.config;

    // если нет accessToken в памяти не делаем refresh
    const token = useAuthStore.getState().token;
    if (!token) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await API.get(prefix.auth.getAccessTokenUser);

        useAuthStore.getState().setToken(data.accessToken);

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return API.request(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().logout();
      }
    }

    return Promise.reject(error);
  }
);
