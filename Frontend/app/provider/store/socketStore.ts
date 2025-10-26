import { create } from "zustand";
import { io, Socket } from "socket.io-client";

import { socket_url } from "@/app/config/API";
import { socketBreakpoint } from "@/app/config/API";

interface SocketState {
  socketMain: Socket | null;
  socketNotifications: Socket | null;
  isConnected: boolean;
  initializeSocket: () => void;
  disconnectSockets: () => void;
}

export const useSocketStore = create<SocketState>((set) => ({
  socketMain: null,
  socketNotifications: null,
  isConnected: false,

  initializeSocket: () => {
    const socketMain = io(socket_url, {
      transports: ["websocket"],
      withCredentials: true,
    });

    //namespaces
    const notificationSocket = io(`${socket_url}${socketBreakpoint.notific}`, {
      transports: ["websocket"],
      withCredentials: true,
    });

    socketMain.on("connect", () => {
      set({ isConnected: true });
      console.log("✅ Main socket connected");
    });
    socketMain.on("disconnect", () => {
      set({ isConnected: false });
      console.log("❌ Main socket disconnected");
    });

    set({ socketMain: socketMain, socketNotifications: notificationSocket });
  },
  disconnectSockets: () => {
    set((state) => {
      state.socketMain?.disconnect();
      state.socketNotifications?.disconnect();
      return {
        socketMain: null,
        socketNotifications: null,
        isConnected: false,
      };
    });
  },
}));
