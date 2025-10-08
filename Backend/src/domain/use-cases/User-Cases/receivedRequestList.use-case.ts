import { User } from '../../entities/User.entities'
import { UserRepository } from '../../repositories/User.repository'

export class ReceivedRequestList {
	constructor(private userRepo: UserRepository) { }

	async execute(userId: number): Promise<User[]> {
		return await this.userRepo.receivedRequestList(userId)
	}
}
