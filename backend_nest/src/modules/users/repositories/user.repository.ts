import { Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { PrismaService } from '../../../db/prismaService/prisma.service'

@Injectable()
export class UserRepository {
	constructor(private readonly prisma: PrismaService) { }

	private readonly userSelectWithoutPassword = {
		id: true,
		login: true,
		UID: true,
		email: true,
		googleId: true,
		authProvider: true,
		avatarUrl: true,
		views: true,
		bannerUrl: true,
		createdAt: true,
		updatedAt: true,
		password: false
	} as const

	async findByEmail(email: string): Promise<Omit<User, 'password'> | null> {
		return this.prisma.user.findUnique({
			where: { email },
			select: this.userSelectWithoutPassword
		})
	}

	async findById(id: number): Promise<Omit<User, 'password'> | null> {
		return this.prisma.user.findUnique({
			where: { id },
			select: this.userSelectWithoutPassword
		})
	}

	async findByUID(UID: string): Promise<Omit<User, 'password'> | null> {
		return this.prisma.user.findUnique({
			where: { UID },
			select: this.userSelectWithoutPassword
		})
	}

	async createUser(data: Prisma.UserCreateInput): Promise<User> {
		return this.prisma.user.create({ data })
	}

	async findByGoogleId(googleId: string): Promise<Omit<User, 'password'> | null> {
		return this.prisma.user.findUnique({
			where: { googleId },
			select: this.userSelectWithoutPassword
		})
	}
}