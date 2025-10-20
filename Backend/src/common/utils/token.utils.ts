import { Injectable, UnauthorizedException } from '@nestjs/common'
import { RedisService } from '../../db/redis/redis.service'

@Injectable()
export class TokenUtils {
	constructor(
		private redis: RedisService
	) {};

	async createRefreshToken(userId: number): Promise < string > {
		const refreshID = crypto.randomUUID()
			await this.redis.setex(
			`refreshToken:${refreshID}`,
			60 * 60 * 24 * 7,
			String(userId)
		)
			return refreshID
	}

	async verifyRefreshToken(token: string) {
		const result = await this.redis.get(`refreshToken:${token}`)
		if (!result) throw new UnauthorizedException('Refresh Token Expired')

		return parseInt(result)
	};

}