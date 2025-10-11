import { User } from '../../entities/User.entities'
import { UserRepository } from '../../repositories/User.repository'

export class DeclineFriendRequest {
	constructor(private userRepo: UserRepository) { }

	async execute(receivedUser: string, userId: number): Promise<User> {
		return await this.userRepo.declineFriendRequest(receivedUser, userId)
	}
}
