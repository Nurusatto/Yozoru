import { HttpException, HttpStatus } from '@nestjs/common'

export class UserAlreadyExistsException extends HttpException {
  constructor(email: string) {
    super(`Пользователь с email ${email} уже существует`, HttpStatus.CONFLICT)
  }
}

export class CodeAlreadySentException extends HttpException {
  constructor(email: string) {
    super(`Код уже был отправлен на ${email}`, HttpStatus.TOO_MANY_REQUESTS)
  }
}

export class CodeExpiredOrNotFoundException extends HttpException {
  constructor() {
    super('Код истек или не найден', HttpStatus.NOT_FOUND)
  }
}

export class CodeMismatchException extends HttpException {
  constructor() {
    super('Неверный код', HttpStatus.BAD_REQUEST)
  }
}

export class CannotFindEmail extends HttpException {
	constructor(email: string) {
		super(`Не удалось найти такого пользователя с почтой ${email}`, HttpStatus.NOT_FOUND)
	};
};

export class WrongPassword extends HttpException {
	constructor() {
		super('Неправильный пароль!', HttpStatus.BAD_REQUEST)
	}
}

export class WrongMatch extends HttpException {
	constructor(keyName: string | null, userKey: string | number) {
		super(`Знаение ${keyName} не  совпадает с ${userKey}`, 400)
	}
};