import { AppError } from './AppError'

export class UserAlreadyExistEmailError extends AppError {
	constructor(email: string) {
		super(`Пользователь с таким ${email} уже существует!`, 409)
	};
};

export class UserAlreadyExistUsernameError extends AppError {
	constructor(username: string) {
		super(`Пользователь с таким ${username} уже существует!`, 409)
	};
};

export class CannotFindEmail extends AppError {
	constructor(email: string) {
		super(`Не удалось найти такого пользователя с почтой ${email}`, 404)
	};
};

export class WrongPassword extends AppError {
	constructor() {
		super('Неправильный пароль!', 400)
	}
}

export class CannotFindUserId extends AppError {
	constructor() {
		super('Не удалось найти пользователя с таким ID', 404)
	}
}