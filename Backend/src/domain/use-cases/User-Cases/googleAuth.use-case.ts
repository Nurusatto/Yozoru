import { UserRepository } from '../../repositories/User.repository'


type GoogleUserDTO = {
	sub: string
	email?: string
	name?: string
	avatar?: string
}

export class GoogleAuth {
	constructor(private userRepo: UserRepository) { };

	async execute(DTO: GoogleUserDTO) {
		let user = await this.userRepo.findByGoogleId(DTO.sub)
		if (!user && DTO.email) {
			user = await this.userRepo.findByEmail(DTO.email)
		};

		if (!user) {
			user = await this.userRepo.createGoogleAccount(DTO)
		};

		const { password, ...safeUser } = user
		return safeUser
	};
}