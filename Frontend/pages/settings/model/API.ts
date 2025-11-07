import { prefix } from "@/app/config/API";
import { API } from "@/shared/API/Instance";

import type { passwordData } from "./types/password";
import type { emailData, emailVerify } from "./types/email";

export const LogOut = async () => {
  const res = await API.get(prefix.login.logOut);
  return res.data;
};

export const postChangePassword = async (data: passwordData) => {
  const res = await API.post(prefix.account.updatePassword, data);
  return res.data;
};

export const postEmail = async (data: emailData) => {
  const res = await API.post(prefix.account.updateEmail, data);
  return res.data;
};

export const postEmailVerify = async (data: emailVerify) => {
  const res = await API.post(prefix.account.updateEmailVerify, data);
  return res.data;
};
