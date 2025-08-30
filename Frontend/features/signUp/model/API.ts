import { API } from "@/shared/API/Instance";
import { prefix } from "@/app/config/API";

import type { SignUpProps, message, registerProp } from "./type";

export const registerUser = async (data: registerProp): Promise<message> => {
  const response = await API.post<message>(prefix.auth.register, data);
  return response.data;
};

export const verifyUser = async (data: SignUpProps) => {
  return API.post(prefix.auth.registerVerify, data);
};
