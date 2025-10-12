import { useEffect, type ReactNode } from "react";
import { useSocketStore } from "../store/socketStore";

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const initializeSocket = useSocketStore((s) => s.initializeSocket);

  useEffect(() => {
    initializeSocket();
  }, [initializeSocket]);

  return <>{children}</>;
};
