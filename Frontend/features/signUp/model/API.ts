import { API } from "@/shared/API/Instance";
import { prefix } from "@/app/config/API";

import type { SignUpProps, registerProp } from "./type";

export const registerUser = async (data: registerProp) => {
  const res = await API.post(prefix.auth.register, data);
  return res.data;
};

export const verifyUser = async (data: SignUpProps) => {
  return API.post(prefix.auth.registerVerify, data);
};
