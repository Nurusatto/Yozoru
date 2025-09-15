import { NextFunction, Request, Response } from 'express'
import { AppError } from '../errors/errorTypes/AppError'

export const ErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof AppError) {
		return res.status(err.statusCode).json({ message: err.message })
	}
	console.error(err)
	const status = err.status ?? 500
	const message = err.message ?? 'Внутренняя ошибка'
	return res.status(status).json({ error: message })
}