import { IsEmail, IsString, MinLength } from 'class-validator'

export class LoginDto {
	@IsEmail()
	@MinLength(1, { message: "Поле не должно быть пустым" })
	email: string

	@IsString()
	@MinLength(8, { message: "Пароль должен состоять из 8 символов!" })
	password: string
}