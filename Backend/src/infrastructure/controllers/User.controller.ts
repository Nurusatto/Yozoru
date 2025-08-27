import { Request, Response, NextFunction } from 'express';
import { googleAuth, login, register, verifyLogin, verifyRegister } from '../../bootstrap';
import jwt from 'jsonwebtoken';

import { getGoogleClient } from '../providers/googleClient';


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
			const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET!, { expiresIn: '168h'});
			res.cookie('token', token, {
				httpOnly: true,
				sameSite: 'lax',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 60 * 60 * 24 * 7 * 1000
			});
			res.status(200).json({
				success: true,
				message: "Вы успешно зарегистрировались!",
				user: user
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
			const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET!, { expiresIn: '168h'});
			res.cookie('token', token, {
				httpOnly: true,
				sameSite: 'lax',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 60 * 60 * 24 * 7 * 1000
			});
			res.status(200).json({
				success: true,
				message: "Вы успешно вошли в аккаунт!",
				user: user
			})
		}catch(err){
			next(err);
		}
	},

	logout(req: Request, res: Response){
		res.clearCookie('token');
		res.status(200).json({
			success: "true",
			message: "Вы успешно вышли из аккаунта"
		})
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

		const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET!, { expiresIn: "7d"});
		res.cookie('token', token, 
			{
				httpOnly: true,
				sameSite: 'lax',
				secure: process.env.NODE_ENV === "production",
				maxAge: 60 * 60 * 24 * 7 * 1000
			}
		)

		res.redirect("http://localhost:3000");
		console.log(user);
		console.log(dto);
		}catch(err){
			next(err);
		}
	},
}