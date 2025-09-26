import { io } from "socket.io-client";

const socket = io("http://localhost:3000");
  
socket.on("connect", () => {
  console.log("✅ Подключён! ID:", socket.id);
  socket.emit("chat_message", "Привет с Node-клиента!");
});

socket.on("chat_message", (msg) => {
  console.log("📨 Получено сообщение:", msg);
});

socket.on("connect_error", (error) => {
  console.error("❌ Ошибка подключения:", error);
});

socket.on("disconnect", () => {
  console.log("❌ Отключено от сервера");
});

console.log("🚀 Попытка подключения к серверу...");