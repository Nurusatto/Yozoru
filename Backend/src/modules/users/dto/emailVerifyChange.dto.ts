import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class emailVerifyChangeDto {
	@IsNotEmpty()
	@IsNumber()
	@IsEmail()
	code: number
}