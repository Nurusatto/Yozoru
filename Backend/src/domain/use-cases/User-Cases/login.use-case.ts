import { z } from 'zod'
import { logindDTO } from '../../entities/User.entities'
import { UserRepository } from '../../repositories/User.repository'

const DTO = z.object({
	email: z.email().min(1, 'Поле не должно быть пустым'),
	password: z.string().min(8, 'Пароль должен состоять из 8 символов')
})

export class Login {
	constructor(private userRepo: UserRepository) { };

	async execute(dto: logindDTO) {
		const parsed = DTO.safeParse(dto)
		if (!parsed.success) throw new Error(`Ошибка при парсинге: ${parsed.error.message}`)

		await this.userRepo.login(dto)
	};
}