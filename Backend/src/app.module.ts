import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CommonModule } from './common/common.module'
import { PrismaModule } from './db/prismaService/prisma.module'
import { RedisModule } from './db/redis/redis.module'
import { AuthModule } from './modules/auth/auth.module'

import { FriendshipModule } from './modules/friendship/friendship.module'
import { UserModule } from './modules/users/user.module'
import { WebSocketModule } from './WebSocket/websocket.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    PrismaModule,
    RedisModule,
    WebSocketModule,
    CommonModule,
    AuthModule,
    UserModule,
    FriendshipModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
