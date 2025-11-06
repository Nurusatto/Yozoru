import { API } from "@/shared/API/Instance";
import { prefix } from "@/app/config/API";
import type { ResetForm } from "./type";

export const postEmail = async (email: string) => {
  const res = await API.post(prefix.auth.resetPassword, { email });
  console.log(res);
  return res.data;
};

export const postVerify = async (data: ResetForm) => {
  const res = await API.post(prefix.auth.resetVerify, data);
  console.log(res);
  return res.data;
};
