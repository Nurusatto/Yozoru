import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { MailService } from '../../../common/services/mail.service'
import { CodeGeneratorUtils } from '../../../common/utils/code-generator.utils'
import { PrismaService } from '../../../db/prismaService/prisma.service'
import { RedisService } from '../../../db/redis/redis.service'
import { CodeAlreadySentException, CodeExpiredOrNotFoundException, CodeMismatchException } from '../exceptions/auth.exceptions'


@Injectable()
export class authRepository {

	constructor(
		private readonly prisma: PrismaService,
		private readonly mailService: MailService,
		private readonly redis: RedisService
	) { }

	async resetPassword(email: string) {
		const code = CodeGeneratorUtils.generateCode()
		const codeKey = `recover_code:${email}`

		const wasSet = await this.redis.set(
			codeKey,
			code.toString(),
			'EX',
			60,
			'NX'
		)

		if (!wasSet) {
			throw new CodeAlreadySentException(`Код уже отправлен на почту ${email}`)
		}

		await this.mailService.sendEmail(
			email,
			'Восстановление вашей почты',
			`Ваш код для восстановления: ${code}`
		)
	}

	async resetPasswordVerify(email: string, sendedCode: string) {
		const codeKey = await this.redis.get(`recover_code:${email}`)

		if (!codeKey) {
			throw new CodeExpiredOrNotFoundException()
		}

		if (codeKey !== sendedCode) {
			throw new CodeMismatchException()
		}

		const generatedPassword = CodeGeneratorUtils.generatePassword()

		const hashedPass = await bcrypt.hash(generatedPassword, 10)

		const user = await this.prisma.user.update({
			where: { email: email },
			data: { password: hashedPass }
		})

		await this.mailService.sendEmail(
			email,
			'Сброс пароля',
			`Ваш новый пароль: ${generatedPassword}`
		)

		await this.redis.del(`recover_code:${email}`)
		console.log(`Сгенерированный пароль: ${generatedPassword}`)
		console.log(`Новый пароль: ${user.password}`)
	}

}