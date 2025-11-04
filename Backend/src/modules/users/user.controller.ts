import { Body, Controller, Get, NotFoundException, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common'
import type { Request } from 'express'
import { AuthGuard } from '../../guards/auth.guard'
import { emailChangeDto } from './dto/emailChange.dto'
import { emailVerifyChangeDto } from './dto/emailVerifyChange.dto'
import { passwordChangeDto } from './dto/passwordChange.dto'
import type { DefaultDataDto } from './dto/updateDefaultData.dto'
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

	@Post('updateDefaultSettings')
	@UseGuards(AuthGuard)
	async updateUser(@Body() userUpdateDto: DefaultDataDto, @Req() req: Request) {
		return await this.userService.updateUserData(req.userId, userUpdateDto)
	}

	@Post('updateEmail')
	@UseGuards(AuthGuard)
	async updateEmail(@Body() emailUpdateDto: emailChangeDto, @Req() req: Request) {
		const user = await this.userService.getUserById(req.userId)
		if (!user) {
			throw new NotFoundException(`User id not found`)
		}
		const email = user.email
		await this.userService.updateEmail(email, emailUpdateDto.newEmail)
		return {
			success: true,
			message: "На ваш код отправлена почта на смену почты!"
		}
	}

	@Post('updateEmailVerify')
	@UseGuards(AuthGuard)
	async updateVerifyEmail(@Body() emailUpdateDto: emailVerifyChangeDto, @Req() req: Request) {
		const user = await this.userService.getUserById(req.userId)
		if (!user) {
			throw new NotFoundException(`User id not found`)
		}
		const email = user.email
		await this.userService.updateVerifyEmail(email, emailUpdateDto.code)
		return {
			success: true,
			message: "Почта успешно сменили!"
		}
	}

	@Post('updatePassword')
	@UseGuards(AuthGuard)
	async updatePassword(@Body() passwordUpdateDto: passwordChangeDto, @Req() req: Request) {
		const user = await this.userService.getUserByIdWithOnlyPass(req.userId)
		if (!user) {
			throw new NotFoundException(`User id not found`)
		}
		await this.userService.updatePassword(req.userId, passwordUpdateDto.oldPassword, passwordUpdateDto.newPassword, passwordUpdateDto.confirmPassword)

		return {
			success: true,
			message: "Пароль успешно сменен"
		}
	}
}
