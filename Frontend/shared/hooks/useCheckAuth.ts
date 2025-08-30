// shared/hooks/useCheckAuth.ts
import { useEffect } from "react";
import { useAuthStore } from "@/app/provider/store/authStore";
import { useNavigate } from "@tanstack/react-router";
import axios from "axios";

export function useCheckAuth(redirectIfUnauthorized = true) {
  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setUser(null);
        if (redirectIfUnauthorized) navigate({ to: "/auth/login" });
        return;
      }

      try {
        const { data } = await axios.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser({
          id: data.id,
          login: data.name,
          email: data.email,
          password: data.password,
        });
      } catch (error) {
        setUser(null);
        localStorage.removeItem("token");
        if (redirectIfUnauthorized) navigate({ to: "/auth/login" });
      }
    };

    checkAuth();
  }, [setUser, navigate, redirectIfUnauthorized]);
}
