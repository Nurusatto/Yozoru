import { AppError } from './AppError'

export class Expired_Or_Notfound extends AppError {
	constructor (keyName: string | null){
		super(`Срок ключа ${keyName}, истёк или не найден.`, 404);
	}
};

export class WrongMatch extends AppError {
	constructor (keyName: string | null, userKey: string | number ){
		super(`Знаение ${keyName} не  совпадает с ${userKey}`, 400);
	}
};

export class AlreadySended extends AppError {
	constructor (email: string | null){
		super(`Код уже был отправлен на почту ${email}!`, 429);
	}
};