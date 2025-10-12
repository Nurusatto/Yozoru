import type { ComponentType } from "react";
import Home from "@svg/headerNavLinks/Home.svg?react";
import Message from "@svg/headerNavLinks/Mes.svg?react";
import Friends from "@svg/headerNavLinks/friend.svg?react";
import Profile from "@svg/headerNavLinks/profile.svg?react";
import settings from "@/shared/svg/settings.svg?react";

type NavLink = {
  to: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
};

export const navLinks: NavLink[] = [
  { to: "/", label: "Home", icon: Home },
  { to: "/message", label: "Message", icon: Message },
  { to: "/friend", label: "Friend", icon: Friends },
  { to: "/profile", label: "Profile", icon: Profile },
  { to: "/settings", label: "Settings", icon: settings },
];
