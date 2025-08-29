import { AppError } from './AppError';

export class Cookie_Expired_Or_NotFound extends AppError {
	constructor(cookieKey: any){
		super(`Такого ключа не найден или истёк!`, 404);
	};
};