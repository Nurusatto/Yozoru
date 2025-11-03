import { BadRequestException, Injectable } from '@nestjs/common';
import { FriendshipRepository } from './repositories/friendship.repository'
import { FriendshipGetListRepository } from './repositories/friendship-getList.repository'

@Injectable()
export class FriendshipService {
	constructor(
		private friendRepo: FriendshipRepository,
		private friendGetListRepo: FriendshipGetListRepository
	) {}

	private selfValidate(firstId: number, secondId: number) {
		if(firstId === secondId){
			throw new BadRequestException('Нельзя отправить запрос самому себе');
		}
	}

	async sendFriendRequest(mainUserId: number, receiverId: number){
		this.selfValidate(mainUserId, receiverId)
		return await this.friendRepo.createFriendship(mainUserId, receiverId)
	}

	async acceptFriendRequest(mainUserId: number, receiverId: number) {
		this.selfValidate(mainUserId, receiverId)
		return await this.friendRepo.acceptFriend(mainUserId, receiverId)
	}

	async declineFriendRequest(mainUserId: number, receiverId: number){
		this.selfValidate(mainUserId, receiverId)
		return await this.friendRepo.declineFriend(mainUserId, receiverId)
	}

	async getFriends(mainUserId: number) {
		return await this.friendGetListRepo.getFriendList(mainUserId)
	}

	async getReceivedFriends(mainUserId: number) {
		return await this.friendGetListRepo.getReceivedRequests(mainUserId)
	}

	async getSendedFriends(mainUserId: number) {
		return await this.friendGetListRepo.getSendedRequests(mainUserId)
	}

	async getUserList(searchUID: string){
		return await this.friendGetListRepo.findUsersList(searchUID);
	}
}
