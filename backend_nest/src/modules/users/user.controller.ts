import { Controller, Get, UseGuards, Req, Post, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '../../guards/auth.guards'
import { UserService } from './user.service'
import type { Request } from 'express'

@Controller('account')
export class UserController {
	constructor(private readonly userService: UserService) { }

	@Get('me')
	@UseGuards(AuthGuard)
	async getUser(@Req() req: Request) {
		return await this.userService.getUserById(req.userId)
	}

	@Post('accessToken')
	async refreshAccessToken(@Req() req: Request) {
		const refreshToken = req.cookies?.refreshToken
				
		if(!refreshToken) {
			throw new UnauthorizedException('Refresh token not found')
		}
		const accessToken = await this.userService.getAccessToken(refreshToken)
		return { accessToken }
	}

}
