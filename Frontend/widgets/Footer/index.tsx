import { useBreakpoint } from "@/shared/hooks/useBreakPoint";
import { FooterTablet } from "./Tablet/";

export const Footer = function () {
  const bp = useBreakpoint();

  if (bp === "mobile") return <FooterTablet />;
};
