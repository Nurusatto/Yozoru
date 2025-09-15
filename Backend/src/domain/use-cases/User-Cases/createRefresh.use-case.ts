import { JWT_Utils } from '../../../infrastructure/utils/jwt/generalJwtUtils'
import { UserRepository } from '../../repositories/User.repository'

export class CreateRefresh {
	constructor(private userRepo: UserRepository) { };

	async execute(userId: number) {

		const refreshToken = await this.userRepo.createRefreshToken(userId)
		const accessToken = JWT_Utils.generateAccessToken(userId)

		return { refreshToken, accessToken }
	}
}