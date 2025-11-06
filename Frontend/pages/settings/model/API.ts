import { prefix } from "@/app/config/API";
import { API } from "@/shared/API/Instance";

import type { passwordData } from "./types/password";

export const LogOut = async () => {
  const res = await API.get(prefix.login.logOut);
  return res.data;
};

export const postChangePassword = async (data: passwordData) => {
  const res = await API.post(prefix.account.updatePassword, { data });
  return res.data;
};
