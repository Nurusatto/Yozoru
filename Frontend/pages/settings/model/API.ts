import { prefix } from "@/app/config/API";
import { API } from "@/shared/API/Instance";

export const LogOut = async () => {
  const res = await API.get(prefix.login.logOut);
  return res.data;
};
