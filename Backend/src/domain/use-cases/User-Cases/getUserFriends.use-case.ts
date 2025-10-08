import { UserRepository } from '../../repositories/User.repository';

export class GetUserFriends {
	constructor(private userRepo: UserRepository) {}

	async execute(userId: number){
		return await this.userRepo.getUserFriends(userId);
	}
}