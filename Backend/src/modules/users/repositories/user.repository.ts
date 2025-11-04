import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { MailService } from '../../../common/services/mail.service'
import { CodeGeneratorUtils } from '../../../common/utils/code-generator.utils'
import { PrismaService } from '../../../db/prismaService/prisma.service'
import { RedisService } from '../../../db/redis/redis.service'
import { DefaultDataDto } from '../dto/updateDefaultData.dto'

@Injectable()
export class UserRepository {
	constructor(
		private readonly prisma: PrismaService,
		private mailService: MailService,
		private redis: RedisService
	) { }

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

	private readonly userSelectOnlyPassword = {
		password: true
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

	async findByIdWithPass(id: number): Promise<Omit<User, 'password'> | null> {
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

	async updateDefaultData(id: number, userData: DefaultDataDto) {

		const updateMap = {
			login: { login: userData.newLogin },
			uid: { UID: userData.newUid },
			avatarUrl: { avatarUrl: userData.newAvatarUrl },
			bannerUrl: { bannerUrl: userData.newBannerUrl }
		}

		try {
			return await this.prisma.user.update({
				where: { id },
				data: updateMap[userData.type]
			})
		} catch (err) {
			if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
				throw new ConflictException('This value is already taken')
			}
		}
	}

	async updateUserEmail(email: string, newEmail: string) {
		const code = CodeGeneratorUtils.generateCode()
		await this.redis.setex(`updateEmailCode:${email}`, 60 * 5, `${code.toString()}`)
		await this.redis.setex(`updateEmailData:${email}`, 60 * 5, newEmail)

		await this.mailService.sendEmail(
			email,
			"Код на смену почты",
			`Ваш код: ${code}`
		)
	}

	async updateUserEmailVerify(email: string, sendedCode: number) {
		const storedCode = await this.redis.get(`updateEmailCode:${email}`)
		if (!storedCode) {
			throw new NotFoundException(`Код истёк или не найден`)
		}
		const code = Number(storedCode)
		if (sendedCode !== code) {
			throw new ConflictException(`Неправильный код`)
		}
		const storedEmail = await this.redis.get(`updateEmailData:${email}`)

		if (!storedEmail) {
			throw new NotFoundException('Email не найден в кэше')
		}

		await this.prisma.user.update({
			where: { email: email },
			data: { email: storedEmail }
		})
	}

	async updateUserPassword(id: number, oldPassword: string, newPassword: string, confirmPassword: string) {
		const user = await this.prisma.user.findFirst({
			where: { id: id }
		})
		if (!user) {
			throw new NotFoundException(`Account not found`)
		}

		const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password!)
		if (!isOldPasswordValid) {
			throw new UnauthorizedException(`Неверный старый пароль`)
		}

		if (newPassword !== confirmPassword) {
			throw new BadRequestException(`Новый пароль и подтверждение не совпадают`)
		}

		if (oldPassword === newPassword) {
			throw new BadRequestException(`Новый пароль должен отличаться от старого`)
		}

		const hashedPassword = await bcrypt.hash(newPassword, 10)

		await this.prisma.user.update({
			where: { id },
			data: { password: hashedPassword }
		})

		return { message: 'Пароль успешно обновлен' }
	}

}