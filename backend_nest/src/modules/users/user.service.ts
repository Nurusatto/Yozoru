import { Injectable, UnauthorizedException, Logger } from '@nestjs/common'
import { UserRepository } from './repositories/user.repository'
import { JwtUtils } from 'src/common/utils/jwt.utils'
import { TokenUtils } from 'src/common/utils/token.utils'
import { Prisma, User } from '@prisma/client'

@Injectable()
export class UserService {
	private logger = new Logger('UserService')

	constructor(
		private readonly userRepository: UserRepository,
		private jwtUtils: JwtUtils,
		private tokenUtils: TokenUtils
	) {}

	async getUserByEmail(email: string) {
		return this.userRepository.findByEmail(email)
	}

	async getUserById(id: number) {
		return this.userRepository.findById(id)
	}

	async getUserByUID(UID: string) {
		return this.userRepository.findByUID(UID)
	}

	async getUserByGoogleId(googleId: string) {
		return this.userRepository.findByGoogleId(googleId)
	}

	async getAccessToken(token: string) {

		try {
			const userId = await this.tokenUtils.verifyRefreshToken(token)
			
			if (!userId) {
				throw new UnauthorizedException('Invalid refresh token')
			}

			const accessToken = this.jwtUtils.generateAccessToken(userId)

			return accessToken

		} catch (error) {
			throw new UnauthorizedException('Refresh token expired or invalid')
		}
	}

	async createUser(data: Prisma.UserCreateInput): Promise<User> {
		try {
			const user = await this.userRepository.createUser(data)
			return user
		} catch (error) {
			this.logger.error(`Failed to create user: ${error.message}`)
			throw error
		}
	}
}