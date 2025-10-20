import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class sendFriendDto { 
	@IsString({ message: 'UID должен быть строкой'})
	@IsNotEmpty({ message: 'UID обязателен'})
	@MinLength(5, { message: "UID должен содержать минимум 5 символа"})
	@MaxLength(32, { message: "UID не должен превышать 32 символов"})
	UID: string
}