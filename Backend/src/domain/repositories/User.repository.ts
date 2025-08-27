import { User, registerDTO, logindDTO } from '../entities/User.entities';

export interface UserRepository {
	register(DTO: registerDTO): Promise<void>
	verifyRegister(email: string, code: string): Promise<Omit<User, 'password'>>
	login(DTO: logindDTO): Promise<void>
	verifyLogin(email: string, code: string): Promise<Omit<User, 'password'>>

	// OAuth2 ---- Google //
	findByGoogleId(googleId: string): Promise<User | null>
	findByEmail(email: string): Promise<User | null>
	createGoogleAccount(acc: {
		sub: string,
		email?: string,
		name?: string,
		avatar?: string
	}): Promise<User>
};