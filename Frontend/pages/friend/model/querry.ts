import { useQuery } from "@tanstack/react-query";

import { getFriends } from "./api";

import type { FriendListResponse } from "./type";

export const useGetFriends = () => {
  return useQuery<FriendListResponse>({
    queryKey: ["getFriends"],
    queryFn: getFriends,
  });
};
