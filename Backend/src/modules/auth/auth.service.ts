import { Injectable } from '@nestjs/common'
import type { Client } from 'openid-client'
import { Issuer } from 'openid-client'
import { UserResponse } from '../types/userTypes/user.entity'
import { UserService } from '../users/user.service'
import { GoogleUserDto } from './dto/google-auth.dto'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'
import { VerifyDto } from './dto/verify.dto'
import { GoogleAuthRepository } from './repositories/google-auth.repository'
import { LoginRepository } from './repositories/login.repository'
import { RegisterRepository } from './repositories/register.repository'
import { authRepository } from './repositories/auth.repository'


@Injectable()
export class AuthService {
	private client: Client | null = null
	constructor(
		private registerRepository: RegisterRepository,
		private loginRepository: LoginRepository,
		private googleRepository: GoogleAuthRepository,
		private authRepository: authRepository,
		private userService: UserService,
	) { }


	async register(dto: RegisterDto): Promise<void> {
		await this.registerRepository.register(dto.login, dto.email, dto.password)
	}

	async verifyRegister(dto: VerifyDto) {
		return await this.registerRepository.verifyRegister(dto.email, dto.code)
	}

	async login(dto: LoginDto) {
		await this.loginRepository.login(dto.email, dto.password)
	}

	async verifyLogin(dto: VerifyDto): Promise<UserResponse> {
		return await this.loginRepository.verifyLogin(dto.email, dto.code)
	}

	async googleAuth(dto: GoogleUserDto) {
		let user = await this.userService.getUserByGoogleId(dto.sub)
		if (!user && dto.email) {
			user = await this.userService.getUserByEmail(dto.email)
		};

		if (!user) {
			user = await this.googleRepository.createGoogleAccount(dto)
		};

		return user
	}

	async createClient(): Promise<Client> {
		const googleIssuer = await Issuer.discover('https://accounts.google.com')
		return new googleIssuer.Client({
			client_id: process.env.GOOGLE_CLIENT_ID!,
			client_secret: process.env.GOOGLE_CLIENT_SECRET!,
			redirect_uris: [process.env.GOOGLE_REDIRECT_URI!],
			response_types: ['code'],
		})
	}

	async getClient(): Promise<Client> {
		if (!this.client) {
			this.client = await this.createClient()
		}
		return this.client							
	}

	async resetPasswordService(email: string){
		await this.authRepository.resetPassword(email)
	};

	async resetPasswordVerify(email: string, code: string){
		await this.authRepository.resetPasswordVerify(email, code)
	}

}