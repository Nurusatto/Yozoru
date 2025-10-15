import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CommonModule } from './common/common.module'
import { PrismaModule } from './db/prismaService/prisma.module'
import { RedisModule } from './db/redis/redis.module'
import { AuthModule } from './modules/auth/auth.module'

import { ChatModule } from './chat/chat.module'
import { UserModule } from './modules/users/user.module'


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    PrismaModule,
    RedisModule,
    ChatModule,
    CommonModule,
    AuthModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
