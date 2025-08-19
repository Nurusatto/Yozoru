import { BREAKPOINTS } from "@/app/config/breakpoints";
import { useState, useEffect } from "react";

type Breakpoint = "mobile" | "tablet" | "desktop" | "laptop";

export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("mobile");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width >= BREAKPOINTS.desktop) {
        setBreakpoint("desktop");
      } else if (width >= BREAKPOINTS.laptop) {
        setBreakpoint("laptop");
      } else if (width >= BREAKPOINTS.tablet) {
        setBreakpoint("tablet");
      } else {
        setBreakpoint("mobile");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return breakpoint;
}
