import { Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { JwtUtils } from '../../common/utils/jwt.utils'
import { TokenUtils } from '../../common/utils/token.utils'
import { DefaultDataDto } from './dto/updateDefaultData.dto'
import { UserRepository } from './repositories/user.repository'

@Injectable()
export class UserService {
	private logger = new Logger('UserService')

	constructor(
		private readonly userRepository: UserRepository,
		private jwtUtils: JwtUtils,
		private tokenUtils: TokenUtils
	) { }

	async getUserByEmail(email: string) {
		return this.userRepository.findByEmail(email)
	}

	async getUserById(id: number) {
		return this.userRepository.findById(id)
	}

	async getUserByIdWithOnlyPass(id: number) {
		return this.userRepository.findByIdWithPass(id)
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

	async updateUserData(id: number, data: DefaultDataDto) {
		try {
			return await this.userRepository.updateDefaultData(id, data)
		} catch (err) {
			this.logger.error(`Failed to update user: ${err.message}`)
			throw err
		}
	}

	async updateEmail(email: string, newEmail: string) {
		try {
			return await this.userRepository.updateUserEmail(email, newEmail)
		} catch (err) {
			this.logger.error(`Failed to update user mail: ${err.message}`)
			throw err
		}
	}

	async updateVerifyEmail(email: string, sendedCode: number) {
		try {
			return await this.userRepository.updateUserEmailVerify(email, sendedCode)
		} catch (err) {
			this.logger.error(`Failed to verify user mail: ${err.message}`)
			throw err
		}
	}

	async updatePassword(id: number, oldPassword: string, newPassword: string, confirmPassword: string) {
		try {
			return await this.userRepository.updateUserPassword(id, oldPassword, newPassword, confirmPassword)
		} catch (err) {
			this.logger.error(`Failed to verify user mail: ${err.message}`)
			throw err
		}
	}
}