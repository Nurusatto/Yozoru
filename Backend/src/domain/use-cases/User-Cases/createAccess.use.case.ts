import { JWT_Utils } from '../../../infrastructure/utils/jwt/generalJwtUtils'
import { UserRepository } from '../../repositories/User.repository';

export class CreateAccess {
	constructor(private userRepo: UserRepository) {};

	async execute(token: string){
		const userId = await this.userRepo.verifyRefreshToken(token);

		if(!userId) throw new Error('Refresh Token Expired');

		const accessToken = JWT_Utils.generateAccessToken(userId);
		return accessToken;
	}
};