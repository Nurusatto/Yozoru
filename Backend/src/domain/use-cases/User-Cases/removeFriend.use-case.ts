import { UserRepository } from '../../repositories/User.repository'

export class RemoveFriend {
	constructor(private userRepo: UserRepository) { }

	async execute(friendUID: string, userId: number): Promise<void> {
		await this.userRepo.removeFriend(friendUID, userId)
	}
}
