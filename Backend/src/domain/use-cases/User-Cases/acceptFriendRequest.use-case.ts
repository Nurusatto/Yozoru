import { User } from '../../entities/User.entities'
import { UserRepository } from '../../repositories/User.repository'

export class AcceptFriendRequest {
	constructor(private userRepo: UserRepository) { }

	async execute(receivedUser: string, userId: number,): Promise<User> {
		return await this.userRepo.acceptFriendRequest(receivedUser, userId)
	}
}
