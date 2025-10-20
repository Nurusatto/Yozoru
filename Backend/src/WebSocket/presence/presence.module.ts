import { Module } from '@nestjs/common';
import { PresenceGateway } from './presence.gateway';
import { RedisModule } from '../../db/redis/redis.module'

@Module({
	imports: [RedisModule],
	providers: [PresenceGateway],
})
export class PresenceModule {}