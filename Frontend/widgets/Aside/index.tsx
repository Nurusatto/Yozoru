import { useBreakpoint } from "@/shared/hooks/useBreakPoint";
import { AsideWidget } from "./ui/aside";

export const Aside = () => {
  const bp = useBreakpoint();

  if (bp === "desktop" || bp === "laptop") {
    return <AsideWidget />;
  } else {
    return null;
  }
};
