import { API } from "@/shared/API/Instance";
import { prefix } from "@/app/config/API";

import type { SignUpProps, registerProp } from "./type";

export const registerUser = (data: registerProp) =>
  API.post(prefix.auth.register, data);

export const verifyUser = (data: SignUpProps) =>
  API.post(prefix.auth.registerVerify, data);
