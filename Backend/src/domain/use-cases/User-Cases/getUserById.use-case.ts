import { UserRepository } from '../../repositories/User.repository'

export class GetUserById {
	constructor(private userRepo: UserRepository) { };

	async execute(userId: number) {
		return await this.userRepo.findUserById(userId)
	};
}