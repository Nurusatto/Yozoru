import { useEffect, type ReactNode } from "react";
import { useSocketStore } from "../store/socketStore";

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const initializeSocket = useSocketStore((s) => s.initializeSocket);
  const disconnectSockets = useSocketStore((s) => s.disconnectSockets);

  useEffect(() => {
    initializeSocket();

    return () => {
      disconnectSockets();
    };
  }, [initializeSocket, disconnectSockets]);

  return <>{children}</>;
};
