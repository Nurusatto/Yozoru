import { IsEmail, IsString, MinLength } from 'class-validator'

export class PasswordResetDto {
	@IsString()
	@IsEmail()
	@MinLength(1, { message: "Поле не должно быть пустым" })
	email: string
}