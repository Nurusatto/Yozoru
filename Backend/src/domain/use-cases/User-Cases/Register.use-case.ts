import { z } from 'zod';
import { UserRepository } from '../../repositories/User.repository';
import { registerDTO } from '../../entities/User.entities';

const DTO = z.object({
	login: z.string().min(1, 'Поле не должно быть пустым').max(80, 'Слишком длинное название'),
	email: z.email().min(1, 'Поле не должно быть пустым'),
	password: z.string().min(8, 'Пароль должен состоять из 8 символов')
});

export class Register {
	constructor(private userRepo: UserRepository) {};

	async execute(dto: registerDTO){
		const parsed = DTO.safeParse(dto);
		if(!parsed.success) throw new Error(`Ошибка при парсинге: ${parsed.error.message}`);
		
		await this.userRepo.register(dto);
	};
};