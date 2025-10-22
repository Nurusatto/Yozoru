import { API } from "@/shared/API/Instance";
import { prefix } from "@/app/config/API";

export const getFriends = async () => {
  const res = await API.get(prefix.friend.friends);
  return res.data;
};
