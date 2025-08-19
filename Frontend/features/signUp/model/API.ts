import axios from "axios";

import type { SignUpProps } from "./type";

export const SendCode = (email: string) => axios.post("", { email });

export const registerUser = (data: SignUpProps) => axios.post("", data);
