import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtUtils {
	constructor(private configService: ConfigService) {};

	generateAccessToken(userId: number): string {
		const secret = this.configService.get<string>('JWT_SECRET')!
		return jwt.sign({ userId }, secret, { expiresIn: '15m' });
	}

	verifyToken(token: string) {
		const secret = this.configService.get<string>('JWT_SECRET')!
		return jwt.verify(token, secret)
	}
}