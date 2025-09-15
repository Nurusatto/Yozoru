import { API } from "@/shared/API/Instance";
import { prefix } from "@/app/config/API";
import type { FormVerify, OmitFromProp } from "./type";

export const loginUser = async (data: OmitFromProp) => {
  const res = await API.post(prefix.login.login, data);
  return res.data;
};

export const loginVerify = async (data: FormVerify) => {
  const res = await API.post(prefix.login.loginVerify, data);
  return res.data;
};
