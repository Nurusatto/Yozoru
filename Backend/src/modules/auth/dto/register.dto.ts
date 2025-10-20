import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'

export class RegisterDto {
	@IsString()
	@MinLength(1, { message: "Поле не должно быть пустым!" })
	@MaxLength(80, { message: "Слишком длинное название!" })
	login: string

	@IsEmail()
	@MinLength(1, { message: "Поле не должно быть пустым" })
	email: string

	@IsString()
	@MinLength(8, { message: "Пароль должен состоять из 8 символов!" })
	password: string
}