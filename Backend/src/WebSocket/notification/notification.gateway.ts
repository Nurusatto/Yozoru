import {
	WebSocketGateway,
	WebSocketServer,
	OnGatewayConnection,
	OnGatewayDisconnect
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { WsAuthMiddleware } from '../../middleware/websocket-auth.module'

@WebSocketGateway({
	namespace: 'notifications',
	cors: {
		origin: 'http://localhost:5173',
		credentials: true,
	},
})
export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer()
	server: Server

	private userSockets = new Map<number, string>()

	constructor(private wsAuthMiddleware: WsAuthMiddleware) { }

	afterInit(server: Server) {
		server.use(this.wsAuthMiddleware.use())
	}

	async handleConnection(client: Socket) {
		const userId = client['userId']
		
		if (!userId) {
			client.disconnect()
			return
		}

		console.log(`Пользователь ${userId} подключился к уведомлениям`)
		
		this.userSockets.set(userId, client.id)
	}

	async handleDisconnect(client: Socket) {
		const userId = client['userId']
		
		if (userId) {
			this.userSockets.delete(userId)
			console.log(`Пользователь ${userId} отключился от уведомлений`)
		}
	}

	sendNotificationToUser(userId: number, notification: any) {
		const socketId = this.userSockets.get(userId)
		
		if (socketId) {
			this.server.to(socketId).emit('notification', notification)
			console.log(`Уведомление отправлено пользователю ${userId}`)
			console.log(notification)
			return true
		}
		
		console.log(`Пользователь ${userId} не в сети`)
		return false
	}

	sendNotificationToUsers(userIds: number[], notification: any) {
		const results = userIds.map(userId => ({
			userId,
			sent: this.sendNotificationToUser(userId, notification)
		}))
		
		return results
	}
}