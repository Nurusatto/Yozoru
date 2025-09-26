import app from './app'
import redisClient from './infrastructure/db/redis/redis-client'
import http from "http"

import dotenv from 'dotenv'
import { Server, Socket } from 'socket.io'
dotenv.config()

const start = async () => {
	redisClient.on('error', (err) => console.error('Ошибка при запуске redis:', err))
	redisClient.connect().then(() => {
		console.log('Redis запущен')
	}).catch(console.error)

	const server = http.createServer(app);

	const io = new Server(server, {
		cors: {
			origin: 'http://localhost:5173'
		}
	});

	io.on("connection", (socket) => {
		console.log("Клиент подключился: ", socket.id);

		socket.on("chat_message", (msg) => {
			console.log("Сообщение от клиента: ", msg)
			socket.emit("chat_mssage", `Сервер получил: ${msg}`);
		});
		
		socket.on("disconnect", () => {
			console.log("Клиент отключился: ", socket.id);
		})
	});

	server.listen(process.env.PORT, () => {
		console.log(`Сервер запщуен на порту --> ${process.env.PORT}`)
	})
}

start()