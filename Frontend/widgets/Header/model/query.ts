import { useMutation } from "@tanstack/react-query";
import { LogOut } from "./API";
import { useRouter } from "@tanstack/react-router";

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
