import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["CurrentUser"],
    queryFn: async () => {
      const { data } = await axios.get("/auth/me");
      return data;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};
