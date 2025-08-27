import jwt from 'jsonwebtoken';

export const JWT_Utils = {

	async VerifyToken(token: string, ){
		try{
			const payload = jwt.verify(token, process.env.JWT_SECRET!);
			return payload;
		}catch(err){
			throw new Error('Невалидный или истёкший токен');
		}
	}
};