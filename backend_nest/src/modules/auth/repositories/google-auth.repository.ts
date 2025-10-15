import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from '../../../db/prismaService/prisma.service'
import { RedisService } from '../../../db/redis/redis.service'
import {
	CodeAlreadySentException,
	CodeExpiredOrNotFoundException,
	CodeMismatchException,
	UserAlreadyExistsException,
} from '../exceptions/auth.exceptions'
import { GoogleUserDto } from '../dto/google-auth.dto'
import { UserService } from 'src/modules/users/user.service'

@Injectable()
export class GoogleAuthRepository {
	constructor(
		private prisma: PrismaService,
		private redis: RedisService,
		private userRepo: UserService
	) {}

	async createGoogleAccount(dto: GoogleUserDto){	
		if (!dto.email) {
			throw new BadRequestException('Email is required from Google account')
		}

		if (!dto.name) {
			throw new BadRequestException('Name is required from Google account')
		}

		const userNumber = await this.redis.incr('User_UID_Count')
		const UID = `user_${userNumber}`

		const user = await this.userRepo.createUser({
			login: dto.name,
			UID: UID,
			email: dto.email,
			googleId: dto.sub,
			authProvider: 'GOOGLE',
			avatarUrl: dto.picture
		})

		return user
	}
}