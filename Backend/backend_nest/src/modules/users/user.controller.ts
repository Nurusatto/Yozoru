import { Controller, Get, Req, UnauthorizedException, UseGuards } from '@nestjs/common'
import type { Request } from 'express'
import { AuthGuard } from '../../guards/auth.guard'
import { UserService } from './user.service'

@Controller('account')
export class UserController {
	constructor(private readonly userService: UserService) { }

	@Get('me')
	@UseGuards(AuthGuard)
	async getUser(@Req() req: Request) {
		return await this.userService.getUserById(req.userId)
	}

	@Get('accessToken')
	async refreshAccessToken(@Req() req: Request) {
		const refreshToken = req.cookies?.refreshToken

		if (!refreshToken) {
			throw new UnauthorizedException('Refresh token not found')
		}
		const accessToken = await this.userService.getAccessToken(refreshToken)
		return { accessToken }
	}

}
