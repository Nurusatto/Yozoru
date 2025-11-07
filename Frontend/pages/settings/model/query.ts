import { useMutation } from "@tanstack/react-query";
import { LogOut, postChangePassword, postEmail, postEmailVerify } from "./API";
import { useRouter } from "@tanstack/react-router";
import type { AxiosError } from "axios";
import type {
  passwordData,
  passwordError,
  passwordSucces,
} from "./types/password";
import type {
  emailData,
  emailFail,
  emailSucces,
  emailVerify,
} from "./types/email";

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

export const useEmail = () => {
  return useMutation<emailSucces, AxiosError<emailFail>, emailData>({
    mutationFn: (data) => postEmail(data),
  });
};

export const useEmailVerify = () => {
  return useMutation<emailSucces, AxiosError<emailFail>, emailVerify>({
    mutationFn: (data) => postEmailVerify(data),
  });
};
