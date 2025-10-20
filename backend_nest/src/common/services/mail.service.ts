import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as nodemailer from 'nodemailer'
import { Transporter } from 'nodemailer'

@Injectable()
export class MailService {
	private transporter: Transporter

	constructor(private configService: ConfigService) {
		this.transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: this.configService.get<string>('MAIL_USER'),
				pass: this.configService.get<string>('MAIL_PASS')
			},
		})
	}

	async sendEmail(email: string, title: string, description: string): Promise<void> {
		try {
			await this.transporter.sendMail({
				from: 'GamePosing',
				to: email,
				subject: title,
				text: description,
			})
			console.log('Письмо успешно отправлено')
		} catch (err) {
			console.error('Ошибка во время отправки кода на почту: ', err)
			throw err
		}
	};
}