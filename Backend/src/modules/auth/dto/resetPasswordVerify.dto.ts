import { IsEmail, IsNumber, IsString, Length, MinLength } from 'class-validator'

export class PasswordResetVerifyDto {
	@IsString()
	@IsEmail()
	@MinLength(1, { message: "Поле не должно быть пустым" })
	email: string

	@IsNumber()
	@Length(6,6, {message: "Код должен состоять из 6 символов "})
	code: number
}