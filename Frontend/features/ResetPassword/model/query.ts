import { useMutation } from "@tanstack/react-query";
import { postEmail, postVerify } from "./api";
import type { ErrorResponse, ResetResponse, ResetForm } from "./type";
import type { AxiosError } from "axios";

export const useQuerryCode = () => {
  return useMutation<ResetResponse, AxiosError<ErrorResponse>, string>({
    mutationFn: (email: string) => postEmail(email),
  });
};

export const useQuerryVerify = () => {
  return useMutation<ResetResponse, AxiosError<ErrorResponse>, ResetForm>({
    mutationFn: (data: ResetForm) => postVerify(data),
  });
};
