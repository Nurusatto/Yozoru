import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtUtils } from './utils/jwt.utils'
import { MailService } from './services/mail.service'
import { TokenUtils } from './utils/token.utils'
import { RedisModule } from '../db/redis/redis.module'

@Module({
	imports: [ConfigModule, RedisModule],
	providers: [JwtUtils, MailService, TokenUtils],
	exports: [JwtUtils, MailService, TokenUtils],
})
export class CommonModule {}