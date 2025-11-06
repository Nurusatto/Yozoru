import { useBreakpoint } from "@/shared/hooks/useBreakPoint";
import { FooterTablet } from "./ui";

export const Footer = function () {
  const bp = useBreakpoint();

  if (bp === "mobile") return <FooterTablet />;
};
