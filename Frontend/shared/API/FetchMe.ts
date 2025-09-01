import { prefix } from "@/app/config/API";
import { API } from "./Instance";

export const FetchMe = async () => {
  const getToken = await API.get(prefix.auth.getAccessTokenUser);

  const userData = await API.get(prefix.auth.getDataUser);

  return { getToken, userData };
};
