import { User } from '../../entities/User.entities'
import { UserRepository } from '../../repositories/User.repository'

export class DeclineFriendRequest {
	constructor(private userRepo: UserRepository) { }

	async execute(user: User, receivedUser: string): Promise<User> {
		return await this.userRepo.declineFriendRequest(user, receivedUser)
	}
}
