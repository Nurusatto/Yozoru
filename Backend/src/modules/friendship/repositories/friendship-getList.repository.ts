import { Injectable } from '@nestjs/common'
import { FriendshipStatus } from '@prisma/client'
import { PrismaService } from '../../../db/prismaService/prisma.service'

@Injectable()
export class FriendshipGetListRepository {
	constructor(
		private prisma: PrismaService
	) { }

	async getFriendList(mainUserId: number) {
		const list = await this.prisma.friendship.findMany({
			where: {
				status: FriendshipStatus.ACCEPTED,
				OR: [
					{ senderId: mainUserId },
					{ receiverId: mainUserId }
				],
			},
			select: {
				id: true,
				senderId: true,
				receiverId: true,
				receiver: {
					select: {
						id: true,
						login: true,
						UID: true,
						avatarUrl: true,
					}
				},
				sender: {
					select: {
						id: true,
						login: true,
						UID: true,
						avatarUrl: true,
					}
				}
			}
		})

		return list.map(friendship => {
			const friend = friendship.senderId === mainUserId ? friendship.receiver : friendship.sender
			return {
				id: friend.id,
				login: friend.login,
				UID: friend.UID,
				avatarUrl: friend.avatarUrl
			}
		})
	}

	async getSendedRequests(mainUserId: number) {

		const list = await this.prisma.friendship.findMany({
			where: {
				senderId: mainUserId,
				status: FriendshipStatus.PENDING
			},
			select: {
				id: true,
				receiver: {
					select: {
						id: true,
						login: true,
						UID: true,
						avatarUrl: true,
					}
				}
			}
		})

		return list.map(friendReq => {
			return {
				id: friendReq.receiver.id,
				login: friendReq.receiver.login,
				UID: friendReq.receiver.UID,
				avatarUrl: friendReq.receiver.avatarUrl
			}
		})
	}

	async getReceivedRequests(mainUserId: number) {
		const list = await this.prisma.friendship.findMany({
			where: {
				receiverId: mainUserId,
				status: FriendshipStatus.PENDING
			},
			select: {
				id: true,
				sender: {
					select: {
						id: true,
						login: true,
						UID: true,
						avatarUrl: true,
					}
				}
			}
		})
		return list.map(friendReq => {
			return{
				id: friendReq.sender.id,
				login: friendReq.sender.login,
				UID: friendReq.sender.UID,
				avatarUrl: friendReq.sender.avatarUrl
			}
		})
	}

	async getUsersList(searchUID: string){
		
	}
}