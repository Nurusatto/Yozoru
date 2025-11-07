import { useEffect, type ReactNode } from "react";
import { useSocketStore } from "../store/socketStore";
import { useAuthStore } from "../store/authStore";

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const initializeSocket = useSocketStore((s) => s.initializeSocket);
  const disconnectSockets = useSocketStore((s) => s.disconnectSockets);
  const isInitialized = useAuthStore((s) => s.isInitialized);
  const token = useAuthStore((s) => s.token);

  useEffect(() => {
    initializeSocket();

    if (isInitialized && token) {
      console.log("🔌 Initializing socket...");
      initializeSocket();
    }

    return () => {
      disconnectSockets();
    };
  }, [initializeSocket, disconnectSockets, isInitialized, token]);

  return <>{children}</>;
};
