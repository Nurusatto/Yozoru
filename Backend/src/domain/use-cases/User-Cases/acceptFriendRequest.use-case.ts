import { User } from '../../entities/User.entities'
import { UserRepository } from '../../repositories/User.repository'

export class AcceptFriendRequest {
	constructor(private userRepo: UserRepository) { }

	async execute(userId: number, receivedUser: string): Promise<User> {
		return await this.userRepo.acceptFriendRequest(userId, receivedUser)
	}
}
