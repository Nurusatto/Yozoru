import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class emailChangeDto {
	@IsNotEmpty()
	@IsString()
	@IsEmail()
	newEmail: string
}