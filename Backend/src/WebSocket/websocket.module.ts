import { Module } from '@nestjs/common'
import { CommonModule } from '../common/common.module'
import { TokenUtils } from '../common/utils/token.utils'
import { RedisModule } from '../db/redis/redis.module'
import { WsAuthMiddleware } from '../middleware/websocket-auth.module'
import { PresenceGateway } from './presence/presence.gateway'
import { NotificationGateway } from './notification/notification.gateway'

@Module({
	imports: [RedisModule, CommonModule],
	providers: [PresenceGateway, NotificationGateway, WsAuthMiddleware, TokenUtils],
	exports: [WsAuthMiddleware, NotificationGateway]
})
export class WebSocketModule { }
