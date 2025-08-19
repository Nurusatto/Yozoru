import { useBreakpoint } from "@/shared/hooks/useBreakPoint";
import { HeaderDesktop } from "./Desktop/";

export const Header = function () {
  const bp = useBreakpoint();

  if (bp === "desktop" || bp === "laptop" || bp === "tablet")
    return <HeaderDesktop />;
};
