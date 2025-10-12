import { useBreakpoint } from "@/shared/hooks/useBreakPoint";
import { HeaderDesktop } from "./ui";

export const Header = function () {
  const bp = useBreakpoint();

  if (bp === "desktop" || bp === "laptop" || bp === "tablet")
    return <HeaderDesktop />;
};
