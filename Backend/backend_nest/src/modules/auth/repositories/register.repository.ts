import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { MailService } from '../../../common/services/mail.service'
import { CodeGeneratorUtils } from '../../../common/utils/code-generator.utils'
import { PrismaService } from '../../../db/prismaService/prisma.service'
import { RedisService } from '../../../db/redis/redis.service'
import {
	CodeAlreadySentException,
	CodeExpiredOrNotFoundException,
	CodeMismatchException,
	UserAlreadyExistsException,
} from '../exceptions/auth.exceptions'

@Injectable()
export class RegisterRepository {
	constructor(
		private readonly prisma: PrismaService,
		private readonly redis: RedisService,
		private readonly mailService: MailService,
	) { }

	async register(login: string, email: string, password: string): Promise<void> {

		const existingUser = await this.prisma.user.findUnique({
			where: { email },
		})
		if (existingUser) {
			throw new UserAlreadyExistsException(email)
		}

		const existingCode = await this.redis.get(`register_code:${email}`)
		if (existingCode) {
			throw new CodeAlreadySentException(email)
		}

		const code = CodeGeneratorUtils.generateCode()
		await this.redis.setex(`register_code:${email}`, 60 * 5, code.toString())
		await this.redis.setex(
			`register_code_extraData:${email}`,
			60 * 5,
			JSON.stringify({ login, password }),
		)

		await this.mailService.sendEmail(
			email,
			'Code',
			`Ваш код для регистрации: ${code}`,
		)
	}

	async verifyRegister(email: string, code: string) {

		const savedCode = await this.redis.get(`register_code:${email}`)
		if (!savedCode) {
			throw new CodeExpiredOrNotFoundException()
		}
		if (savedCode !== code) {
			throw new CodeMismatchException()
		}

		const extraDataStr = await this.redis.get(`register_code_extraData:${email}`)
		const { login, password } = JSON.parse(extraDataStr!)

		const hashedPassword = await bcrypt.hash(password, 10)

		const userNumber = await this.redis.incr('User_UID_Count')
		const UID = `user_${userNumber}`

		const createdUser = await this.prisma.user.create({
			data: {
				login,
				UID,
				email,
				password: hashedPassword,
			},
			select: {
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
			}
		})

		await this.redis.del(`register_code:${email}`)
		await this.redis.del(`register_code_extraData:${email}`)

		return createdUser; 
	}


}