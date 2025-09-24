import Home from "@svg/Home.svg?react";
import type { ComponentType } from "react";
import Message from "@svg/Message.svg?react";

type NavLink = {
  to: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
};

export const navLinks: NavLink[] = [
  { to: "/", label: "Home", icon: Home },
  { to: "/message", label: "Message", icon: Message },
];
