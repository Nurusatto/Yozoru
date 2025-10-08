import { User } from '../../entities/User.entities'
import { UserRepository } from '../../repositories/User.repository'

export class SendedRequestList {
	constructor(private userRepo: UserRepository) { }

	async execute(userId: number): Promise<User[]> {
		return await this.userRepo.sendedRequestList(userId)
	}
}
