import { UserRepository } from '../../repositories/User.repository'

export class CancelSentRequest {
	constructor(private userRepo: UserRepository) { }

	async execute(userId: number, addresseeUID: string): Promise<void> {
		await this.userRepo.cancelSentRequest(userId, addresseeUID)
	}
}
