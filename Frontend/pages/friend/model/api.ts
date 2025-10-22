import { API } from "@/shared/API/Instance";
import { prefix } from "@/app/config/API";

export const getFriends = async () => {
  const res = await API.get(prefix.friend.friends);
  return res.data;
};

export const getReceivedFriends = async () => {
  const res = await API.get(prefix.friend.receivedFriends);
  return res.data;
};

export const getSendedFriends = async () => {
  const res = await API.get(prefix.friend.sendedFriends);
  return res.data;
};

export const postSendRequest = async (UID: string) => {
  const res = await API.post(prefix.friend.send, { UID });
  return res.data;
};
