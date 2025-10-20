import { IsEmail, IsString, Length, MinLength } from 'class-validator'

export class VerifyDto {
  @IsEmail()
  @MinLength(1, { message: 'Поле не должно быть пустым' })
  email: string

  @IsString()
  @Length(6, 6, { message: 'Код состоит из 6 символов!' })
  code: string
}