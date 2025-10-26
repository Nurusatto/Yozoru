import { useQueryClient } from "@tanstack/react-query";
import { usePostAccept, usePostDecline } from "./querry";

export const useHandleDecline = () => {
  const queryClient = useQueryClient();
  const DeclineQuerry = usePostDecline();

  const handleDecline = (id: number) => {
    DeclineQuerry.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["getReceivedFriends"] });
      },
    });
  };

  return { handleDecline };
};

export const useHandleAccept = () => {
  const AcceptQuerry = usePostAccept();
  const queryClient = useQueryClient();

  const handleAccept = (id: number) => {
    AcceptQuerry.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["getReceivedFriends"] });
        queryClient.invalidateQueries({ queryKey: ["getFriends"] });
      },
    });
  };

  return { handleAccept };
};
