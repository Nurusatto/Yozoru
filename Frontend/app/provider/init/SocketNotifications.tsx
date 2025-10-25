import { useEffect } from "react";
import { useSocketStore } from "../store/socketStore";
import { toast } from "react-toastify";

import Svg from "@/shared/svg/notification/notification.svg?react";

export const SocketNotifications = () => {
  const socketNotifications = useSocketStore((s) => s.socketNotifications);

  useEffect(() => {
    if (!socketNotifications) return;

    socketNotifications.on("connect", () => {
      console.log("📡 Connected to /notifications");
    });

    socketNotifications.on("notification", (data) => {
      console.log("🔔 Уведомление:", data);
      toast.info(data.message || "Новое уведомление", {
        icon: <Svg />,
      });
    });

    return () => {
      socketNotifications.off("notification");
    };
  }, [socketNotifications]);

  return null;
};
