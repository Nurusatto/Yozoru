import { User } from '../../entities/User.entities'
import { UserRepository } from '../../repositories/User.repository'

export class FindUserByUID {
	constructor(private userRepo: UserRepository) { }

	async execute(UID: string): Promise<User | null> {
		return await this.userRepo.findUserByUID(UID)
	}
}
