import { UserRepository } from '../../repositories/User.repository'

export class GetUserIdFromRefreshToken {
	constructor(private userRepo: UserRepository) { };

	async execute(token: string) {
		const userId = await this.userRepo.verifyRefreshToken(token)

		if (!userId) throw new Error('Refresh Token Expired')
		return userId
	}
}