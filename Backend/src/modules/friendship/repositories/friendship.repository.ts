import { BadRequestException, ConflictException, Injectable } from '@nestjs/common'
import { FriendshipStatus } from '@prisma/client'
import { PrismaService } from '../../../db/prismaService/prisma.service'

@Injectable()
export class FriendshipRepository {
	constructor(
		private prisma: PrismaService
	) { }

	async createFriendship(mainUserId: number, receiverId: number) {

		const existingRequest = await this.prisma.friendship.findFirst({
			where: {
				OR: [
					{ senderId: mainUserId, receiverId: receiverId },
					{ senderId: receiverId, receiverId: mainUserId }
				]
			}
		})

		if (existingRequest) {
			const messages = {
				[FriendshipStatus.ACCEPTED]: "Вы уже являетесь другом для данного пользователя",
				[FriendshipStatus.BLOCKED]: "Вы заблокировали пользователя или он заблокировал вас",
				[FriendshipStatus.PENDING]: "Вы уже отправили запрос на дружбу"
			}
			throw new ConflictException(messages[existingRequest.status])
		}

		return await this.prisma.friendship.create({
			data: {
				senderId: mainUserId,
				receiverId: receiverId,
				status: FriendshipStatus.PENDING
			}
		})
	}

	async acceptFriend(mainUserId: number, receiverId: number) {
		const requestCreate = await this.prisma.friendship.findFirst({
			where: {
				senderId: receiverId,
				receiverId: mainUserId,
				status: FriendshipStatus.PENDING
			}
		})

		if (!requestCreate) {
			throw new BadRequestException('Запрос на дружбу не найден или уже обработан')
		}

		return await this.prisma.friendship.update({
			where: { id: requestCreate.id },
			data: {
				status: FriendshipStatus.ACCEPTED
			}
		})
	}

	async declineFriend(mainUserId: number, receiverId: number) {
		const requestCreate = await this.prisma.friendship.findFirst({
			where: {
				senderId: receiverId,
				receiverId: mainUserId,
				status: FriendshipStatus.PENDING
			}
		})

		if (!requestCreate) {
			throw new BadRequestException('Запрос на дружбу не найден или уже обработан')
		}

		return await this.prisma.friendship.update({
			where: { id: requestCreate.id },
			data: {
				status: FriendshipStatus.DECLINED
			}
		})
	}
}