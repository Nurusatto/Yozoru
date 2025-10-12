import { NextFunction, Request, Response } from 'express'
import { acceptFriendRequest, cancelSentRequest, createAccess, createRefresh, declineFriendRequest, findUserByUID, getUserById, getUserFriends, googleAuth, login, receivedRequestList, register, removeFriend, sendedRequestList, sentFriendRequest, verifyLogin, verifyRegister } from '../../bootstrap'

import { Cookie_Expired_Or_NotFound } from '../errors/errorTypes/Cookies-Errors'
import { getGoogleClient } from '../providers/googleClient'
import { CookieUtils } from '../utils/cookie/cookieUtils'

export const UserController = {
	async register(req: Request, res: Response, next: NextFunction) {
		try {
			const data = req.body
			await register.execute(data)

			res.status(200).json({
				success: true,
				message: 'На вашу почту отправлен код!'
			})
		} catch (err) {
			next(err)
		};
	},

	async verifyRegister(req: Request, res: Response, next: NextFunction) {
		try {
			const { email, code } = req.body
			const user = await verifyRegister.execute({ email, code })

			const { accessToken, refreshToken } = await createRefresh.execute(user.id)

			CookieUtils.setRefreshToken(res, refreshToken)

			res.status(200).json({
				success: true,
				message: "Вы успешно зарегистрировались!",
				user: user,
				accessToken: accessToken
			})
		} catch (err) {
			next(err)
		}
	},

	async login(req: Request, res: Response, next: NextFunction) {
		try {
			const data = req.body
			await login.execute(data)

			res.status(200).json({
				success: true,
				message: 'На вашу почту отправлен код на вход в аккаунт!'
			})
		} catch (err) {
			next(err)
		}
	},

	async verifyLogin(req: Request, res: Response, next: NextFunction) {
		try {
			const { email, code } = req.body
			const user = await verifyLogin.execute({ email, code })

			const { accessToken, refreshToken } = await createRefresh.execute(user.id)

			CookieUtils.setRefreshToken(res, refreshToken)

			res.status(200).json({
				success: true,
				message: "Вы успешно вошли в аккаунт!",
				user: user,
				accessToken: accessToken
			})
		} catch (err) {
			next(err)
		}
	},

	logout(req: Request, res: Response, next: NextFunction) {
		try {
			CookieUtils.clearRefreshToken(res)
			res.status(200).json({ success: true, message: "Вы вышли из аккаунта" })
		} catch (err) {
			next(err)
		}
	},

	async startAuthGoogle(req: Request, res: Response) {
		const client = await getGoogleClient()

		const url = client.authorizationUrl({
			scope: "openid email profile",

		})

		res.redirect(url)
	},

	async googleCallback(req: Request, res: Response, next: NextFunction) {
		try {
			const client = await getGoogleClient()

			const params = client.callbackParams(req)
			const tokenSet = await client.callback(process.env.GOOGLE_REDIRECT_URI!, params)
			const userInfo = await client.userinfo(tokenSet.access_token!)

			const dto = {
				sub: userInfo.sub,
				email: userInfo.email,
				name: userInfo.name,
				avatar: userInfo.picture
			}

			const user = await googleAuth.execute(dto)

			const { accessToken, refreshToken } = await createRefresh.execute(user.id)

			CookieUtils.setRefreshToken(res, refreshToken)

			res.redirect("http://localhost:5173")

		} catch (err) {
			next(err)
		}
	},

	async getAccessToken(req: Request, res: Response, next: NextFunction) {
		try {
			const token = req.cookies.refreshToken
			if (!token) throw new Cookie_Expired_Or_NotFound(token)

			const accessToken = await createAccess.execute(token)

			res.status(200).json({
				success: true,
				accessToken: accessToken
			})

		} catch (err) {
			res.status(401).json({
				success: false,
				message: "Вы не авторизованы! Войдите в аккаунт!"
			})
		}
	},

	async getUser(req: Request, res: Response, next: NextFunction) {
		try {
			const user = await getUserById.execute(req.userId)

			res.status(200).json({
				success: true,
				user: user
			})
		} catch (err) {
			next(err)
		}
	},

	async getUserFriends(req: Request, res: Response, next: NextFunction) {
		try {
			const friends = await getUserFriends.execute(req.userId)

			res.status(200).json({
				success: true,
				friends: friends
			})
		} catch (err) {
			next(err)
		}
	},

	async sentFriendRequest(req: Request, res: Response, next: NextFunction) {
		try {
			const { receiveUserUID } = req.body
			const result = await sentFriendRequest.execute(receiveUserUID, req.userId)

			res.status(200).json({
				success: true,
				message: "Запрос дружбы отправлен",
				user: result
			})
		} catch (err) {
			next(err)
		}
	},

	async acceptFriendRequest(req: Request, res: Response, next: NextFunction) {
		try {
			const { receivedUser } = req.body
			const result = await acceptFriendRequest.execute(receivedUser, req.userId)

			res.status(200).json({
				success: true,
				message: "Запрос дружбы принят",
				user: result
			})
		} catch (err) {
			next(err)
		}
	},

	async declineFriendRequest(req: Request, res: Response, next: NextFunction) {
		try {
			const { receivedUser } = req.body
			const result = await declineFriendRequest.execute(receivedUser, req.userId)

			res.status(200).json({
				success: true,
				message: "Запрос дружбы отклонен",
				user: result
			})
		} catch (err) {
			next(err)
		}
	},

	async getReceivedRequests(req: Request, res: Response, next: NextFunction) {
		try {
			const requests = await receivedRequestList.execute(req.userId)

			res.status(200).json({
				success: true,
				requests: requests
			})
		} catch (err) {
			next(err)
		}
	},

	async getSendedRequests(req: Request, res: Response, next: NextFunction) {
		try {
			const requests = await sendedRequestList.execute(req.userId)

			res.status(200).json({
				success: true,
				requests: requests
			})
		} catch (err) {
			next(err)
		}
	},

	async findUserByUID(req: Request, res: Response, next: NextFunction) {
		try {
			const { UID } = req.params
			const user = await findUserByUID.execute(UID)

			if (!user) {
				return res.status(404).json({
					success: false,
					message: "Пользователь не найден"
				})
			}

			res.status(200).json({
				success: true,
				user: user
			})
		} catch (err) {
			next(err)
		}
	},

	async removeFriend(req: Request, res: Response, next: NextFunction) {
		try {
			const { friendUID } = req.body
			await removeFriend.execute(friendUID, req.userId)

			res.status(200).json({
				success: true,
				message: "Пользователь удален из друзей"
			})
		} catch (err) {
			next(err)
		}
	},

	async cancelSentRequest(req: Request, res: Response, next: NextFunction) {
		try {
			const { addresseeUID } = req.body
			await cancelSentRequest.execute(addresseeUID, req.userId)

			res.status(200).json({
				success: true,
				message: "Запрос дружбы отменен"
			})
		} catch (err) {
			next(err)
		}
	}
}
