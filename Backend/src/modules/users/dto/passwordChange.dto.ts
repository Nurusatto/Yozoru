import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class passwordChangeDto {
	@IsNotEmpty()
	@IsString()
	@MinLength(8, { message: 'Пароль должен быть как минимум с 8 символами' })
	oldPassword: string
	newPassword: string
	confirmPassword: string
}