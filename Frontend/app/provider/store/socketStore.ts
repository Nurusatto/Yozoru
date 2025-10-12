import { create } from "zustand";
import { io, Socket } from "socket.io-client";

import { socket_url } from "@/app/config/API";

interface SocketState {
  socket: Socket | null;
  isConnected: boolean;
  initializeSocket: () => void;
}

export const useSocketStore = create<SocketState>((set) => ({
  socket: null,
  isConnected: false,

  initializeSocket: () => {
    const socketInstance = io(socket_url, {
      transports: ["websocket"],
      withCredentials: true,
    });

    socketInstance.on("connect", () => set({ isConnected: true }));
    socketInstance.on("disconnect", () => set({ isConnected: false }));

    set({ socket: socketInstance });
  },
}));
