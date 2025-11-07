import { useMutation } from "@tanstack/react-query";
import { LogOut, postChangePassword } from "./API";
import { useRouter } from "@tanstack/react-router";
import type { AxiosError } from "axios";
import type {
  passwordData,
  passwordError,
  passwordSucces,
} from "./types/password";

export const useLogOut = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: LogOut,
    onSuccess: () => {
      router.navigate({ to: "/" });

      setTimeout(() => {
        window.location.reload();
      }, 100);
    },
  });
};

export const usePassword = () => {
  return useMutation<passwordSucces, AxiosError<passwordError>, passwordData>({
    mutationFn: (data) => postChangePassword(data),
  });
};
