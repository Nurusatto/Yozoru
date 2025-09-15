import { NextFunction, Request, Response } from 'express'
import { getUserIdFromRefreshToken } from '../../bootstrap'
import { Cookie_Expired_Or_NotFound } from '../errors/errorTypes/Cookies-Errors'

declare global {
	namespace Express {
		interface Request {
			userId: number
		}
	}
}

export async function authVerify(req: Request, res: Response, next: NextFunction) {
	try {
		const token = req.cookies?.refreshToken
		if (!token) throw new Cookie_Expired_Or_NotFound(token)
		const userId = await getUserIdFromRefreshToken.execute(token)

		req.userId = userId
		next()
	} catch (err) {
		next(err)
	}
}