import { User } from '../../entities/User.entities'
import { UserRepository } from '../../repositories/User.repository'

export class SentFriendRequest {
	constructor(private userRepo: UserRepository) { }

	async execute(receiveUser: User, userId: number): Promise<User> {
		return await this.userRepo.sentFriendRequest(receiveUser, userId)
	}
}
