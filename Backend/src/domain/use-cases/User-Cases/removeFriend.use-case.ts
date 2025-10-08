import { UserRepository } from '../../repositories/User.repository'

export class RemoveFriend {
	constructor(private userRepo: UserRepository) { }

	async execute(userId: number, friendUID: string): Promise<void> {
		await this.userRepo.removeFriend(userId, friendUID)
	}
}
