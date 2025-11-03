import { IsString } from 'class-validator'

export class searchUserDto {
	@IsString({ message: 'UID должен быть строкой' })
	UID: string
}