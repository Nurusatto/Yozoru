import { redirect } from "@tanstack/react-router";
import { API } from "../API/Instance";
import { prefix } from "@/app/config/API";

export async function ProtectRoute() {
  try {
    const res = await API.get(prefix.auth.getAccessToken);
    console.log(res);
    console.log(res.data);
    return res.data;
  } catch (e) {
    throw redirect({ to: "/auth/login" });
  }
}
