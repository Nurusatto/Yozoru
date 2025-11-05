import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { MailService } from '../../../common/services/mail.service'
import { CodeGeneratorUtils } from '../../../common/utils/code-generator.utils'
import { PrismaService } from '../../../db/prismaService/prisma.service'
import { RedisService } from '../../../db/redis/redis.service'
import {
	CannotFindEmail,
	CodeAlreadySentException,
	CodeExpiredOrNotFoundException,
	WrongMatch,
	WrongPassword
} from '../exceptions/auth.exceptions'

@Injectable()
export class LoginRepository {

	constructor(
		private readonly prisma: PrismaService,
		private readonly redis: RedisService,
		private readonly mailService: MailService
	) { }

	async login(email: string, password: string): Promise<void> {
		const searchUser = await this.prisma.user.findUnique({
			where: { email: email }
		})
		if (!searchUser) throw new CannotFindEmail(email)

		const comparePass = await bcrypt.compare(password!, searchUser.password!)
		if (!comparePass) throw new WrongPassword()

		const code = CodeGeneratorUtils.generateCode()
		const codeKey = `login_code:${email}`

		const wasSet = await this.redis.set(
			codeKey,
			code.toString(),
			'EX',
			60 * 5,
			'NX'
		);

		if(!wasSet){
			throw new CodeAlreadySentException(email)
		}

		const { password: _password, ...userWithoutPassword } = searchUser
		await this.redis.setex(`login_code_extraData:${email}`, 60 * 5, JSON.stringify(userWithoutPassword))

		this.mailService.sendEmail(
			email,
			'Login Code',
			`Код для входа в аккаунт: ${code}`
		)
	}

	async verifyLogin(email: string, code: string) {
		const getKey = await this.redis.get(`login_code:${email}`)
		const extraData = await this.redis.get(`login_code_extraData:${email}`)
		if (!getKey || !extraData) throw new CodeExpiredOrNotFoundException()
		if (getKey !== code) throw new WrongMatch(getKey, code)

		const user = JSON.parse(extraData)

		await this.redis.del(`login_code:${email}`)
		await this.redis.del(`login_code_extraData:${email}`)

		return user
	}

}