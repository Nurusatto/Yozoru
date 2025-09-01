import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { FetchMe } from "@/shared/API/FetchMe";
import { useAuthStore } from "@/app/provider/store/authStore";

export function AppInit() {
  const setToken = useAuthStore((t) => t.setToken);
  const setUserData = useAuthStore((data) => data.setUser);

  const { data, isError } = useQuery({
    queryKey: ["me"],
    queryFn: FetchMe,
    retry: false,
  });

  useEffect(() => {
    if (data) {
      setToken(data.getToken.data);
      setUserData(data.userData.data.user);
    }
    if (data || isError) {
      useAuthStore.getState().setIsInitialized(true);
    }
  }, [data, isError, setToken, setUserData]);

  return null;
}
