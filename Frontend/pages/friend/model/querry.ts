import { useMutation, useQuery } from "@tanstack/react-query";
import type { FriendListResponse } from "./type";

import {
  getFriends,
  getReceivedFriends,
  getSendedFriends,
  postSendRequest,
} from "./api";

export const useGetFriends = () => {
  return useQuery<FriendListResponse>({
    queryKey: ["getFriends"],
    queryFn: getFriends,
  });
};

export const useReceivedFriends = () => {
  return useQuery<FriendListResponse>({
    queryKey: ["getReceivedFriends"],
    queryFn: getReceivedFriends,
  });
};

export const useSendedFriends = () => {
  return useQuery<FriendListResponse>({
    queryKey: ["getSendedFriends"],
    queryFn: getSendedFriends,
  });
};

export const usePostSend = () => {
  return useMutation({
    mutationFn: (UID: string) => postSendRequest(UID),
  });
};
