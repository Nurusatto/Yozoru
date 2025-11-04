import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class emailVerifyChangeDto {
	@IsNotEmpty()
	@IsString()
	@IsEmail()
	code: number
}