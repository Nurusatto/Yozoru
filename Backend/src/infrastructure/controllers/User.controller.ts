import { Request, Response, NextFunction } from 'express';
import { googleAuth, login, refresh, register, verifyLogin, verifyRegister } from '../../bootstrap';
import { JWT_Utils } from '../utils/jwt/generalJwtUtils';

import { getGoogleClient } from '../providers/googleClient';
import { Cookie_Expired_Or_NotFound } from '../errors/errorTypes/Cookies-Errors'
import { CookieUtils } from '../utils/cookie/cookieUtils'

export const UserController = {
	async register(req: Request, res: Response, next: NextFunction){
		try{
			const data = req.body;
			await register.execute(data);

			res.status(200).json({
				success: true,
				message: 'На вашу почту отправлен код!'
			});
		}catch(err){
			next(err);
		};
	},

	async verifyRegister(req: Request, res: Response, next: NextFunction){
		try{
			const { email, code } = req.body;
			const user = await verifyRegister.execute({email, code});

			const {accessToken, refreshToken} = JWT_Utils.generateTokens(user.id);

			CookieUtils.setRefreshToken(res, refreshToken);

			res.status(200).json({
				success: true,
				message: "Вы успешно зарегистрировались!",
				user: user,
				accessToken: accessToken
			})
		}catch(err){
			next(err);
		}
	},

	async login(req: Request, res: Response, next: NextFunction){
		try{
			const data = req.body;
			await login.execute(data);

			res.status(200).json({
				success: true,
				message: 'На вашу почту отправлен код на вход в аккаунт!'
			});
		}catch(err){
			next(err);
		}
	},

	async verifyLogin(req: Request, res: Response, next: NextFunction){
		try{
			const { email, code } = req.body;
			const user = await verifyLogin.execute({email, code});
			
			const { accessToken, refreshToken } = JWT_Utils.generateTokens(user.id);

			CookieUtils.setRefreshToken(res, refreshToken);

			res.status(200).json({
				success: true,
				message: "Вы успешно вошли в аккаунт!",
				user: user,
				accessToken: accessToken
			})
		}catch(err){
			next(err);
		}
	},

	logout(req: Request, res: Response, next: NextFunction){
    try {
      CookieUtils.clearRefreshToken(res);
      res.status(200).json({ success: true, message: "Вы вышли из аккаунта" });
    } catch (err) {
      next(err);
    }
	},

	async startAuthGoogle(req: Request, res: Response){
		const client = await getGoogleClient();

		const url = client.authorizationUrl({
			scope: "openid email profile",
			
		});
		
		res.redirect(url);
	},

	async googleCallback(req: Request, res: Response, next: NextFunction){
		try{
		const client = await getGoogleClient();

		const params = client.callbackParams(req);
		const tokenSet = await client.callback(process.env.GOOGLE_REDIRECT_URI!, params);
		const userInfo = await client.userinfo(tokenSet.access_token!);

		const dto = {
			sub: userInfo.sub,
			email: userInfo.email,
			name: userInfo.name,
			avatar: userInfo.picture
		};

		const user = await googleAuth.execute(dto);

		const { accessToken, refreshToken } = JWT_Utils.generateTokens(user.id);

		CookieUtils.setRefreshToken(res, refreshToken);

		res.redirect("http://localhost:5173");

		}catch(err){
			next(err);
		}
	},

	async refresh(req: Request, res: Response, next: NextFunction) {
		try {
			const refreshToken = req.cookies?.refreshToken;
			if (!refreshToken) throw new Cookie_Expired_Or_NotFound(refreshToken);

			const { accessToken, refreshToken: newRefreshToken, userId } = await refresh.execute(refreshToken);

			CookieUtils.setRefreshToken(res, newRefreshToken);

			res.status(200).json({
				success: true,
				accessToken,
				userId
			});
		} catch (err) {
			res.status(401).json({ success: false, message: "Необходимо войти заново" });
			next(err);
		}
	}

}