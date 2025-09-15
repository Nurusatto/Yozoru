import { User, logindDTO, registerDTO } from '../entities/User.entities'

export interface UserRepository {
	// Sign In / Login functions
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

	// redis
	createRefreshToken(userId: number): Promise<string>
	verifyRefreshToken(token: string): Promise<number | null>

	// Another funcitons
	findUserById(userId: number): Promise<Omit<User, 'password'>>
}