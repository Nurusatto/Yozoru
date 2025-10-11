import { UserRepository } from '../../repositories/User.repository'

export class CancelSentRequest {
	constructor(private userRepo: UserRepository) { }

	async execute(addresseeUID: string, userId: number): Promise<void> {
		await this.userRepo.cancelSentRequest(addresseeUID, userId)
	}
}
