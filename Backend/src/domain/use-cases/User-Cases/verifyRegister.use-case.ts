import { z } from 'zod';
import { UserRepository } from '../../repositories/User.repository';

const DTO = z.object({
	email: z.email().min(1, 'Поле не должно быть пустым'),
	code: z.string().length(6, 'Код состоит из 6 строк!')
});

type verifyDto = z.infer<typeof DTO>

export class VerifyRegister {
	constructor(private userRepo: UserRepository) {};

	async execute(dto: verifyDto){
		const parsed = DTO.safeParse(dto);
		if(!parsed.success) throw new Error(`Ошибка при парсинге: ${parsed.error.message}`);
		
		return await this.userRepo.verifyRegister(dto.email, dto.code);
	};
};