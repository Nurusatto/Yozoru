import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { TokenUtils } from '../common/utils/token.utils'
import { Request } from 'express'

declare global {
	namespace Express {
		interface Request {
			userId: number
		}
	}
}

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private tokenUtils: TokenUtils) {};

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req = context.switchToHttp().getRequest<Request>()
		const token = req.cookies?.refreshToken

		try {
			const userId = await this.tokenUtils.verifyRefreshToken(token)
			req.userId = userId
			return true
		} catch {
			throw new UnauthorizedException('Invalid or expired token')
		}
	}
}
