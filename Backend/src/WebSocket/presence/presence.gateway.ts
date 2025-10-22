import {
	OnGatewayConnection,
	OnGatewayDisconnect,
	WebSocketGateway,
	WebSocketServer
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { RedisService } from '../../db/redis/redis.service'
import { WsAuthMiddleware } from '../../middleware/websocket-auth.module'

@WebSocketGateway({
	cors: {
		origin: 'http://localhost:5173',
		credentials: true,
	},
})

export class PresenceGateway implements OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer()
	server: Server

	constructor(
		private redis: RedisService,
		private wsAuthMiddleware: WsAuthMiddleware
	) { }

	afterInit(server: Server) {
		server.use(this.wsAuthMiddleware.use())
	}

	async handleConnection(client: Socket) {
		const userId = client['userId']
		console.log('userId из client:', userId)

		if (!userId) return

		console.log(`Пользователь: ${userId} подключился`)

		await this.redis.sadd('online_users', userId)
		await this.redis.expire('online_users', 86400)

		const count = await this.redis.scard('online_users')

		this.server.emit('onlineUsers', {
			count,
			userId,
			action: 'joined'
		})
	}

	async handleDisconnect(client: Socket) {
		const userId = client['userId']
		if (!userId) return

		const wasOnline = await this.redis.srem('online_users', userId)
		if (wasOnline) {
			const count = await this.redis.scard('online_users')

			this.server.emit('onlineUsers', {
				count,
				userId,
				action: 'left'
			})

			console.log(`Пользователь ${userId} отключился. Онлайн: ${count}`)
		}
	}

	static async getOnlineCount(redis: RedisService): Promise<number> {
		return await redis.scard('online_users')
	}

}