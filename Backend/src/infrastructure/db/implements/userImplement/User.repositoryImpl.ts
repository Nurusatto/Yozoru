import { logindDTO, registerDTO, User } from '../../../../domain/entities/User.entities';
import { UserRepository } from '../../../../domain/repositories/User.repository';
import prisma from '../../prisma';
import redis from '../../redis/redis-client'
import bcrypt from 'bcrypt';

//utils
import generateCode from '../../../utils/general/generateCode'
import { CannotFindEmail, CannotFindUserId, UserAlreadyExistEmailError, UserAlreadyExistUsernameError, WrongPassword } from '../../../errors/errorTypes/User-Errors'
import { transporter, sendEmail } from '../../../utils/nodemailer/generalNodeMailer';
import { AlreadySended, Expired_Or_Notfound, WrongMatch } from '../../../errors/errorTypes/Redis-Errors'

export class UserRepositoryImpl implements UserRepository {

	async register(DTO: registerDTO): Promise<void> {
		const existUserEmail =  await prisma.user.findUnique({
			where: { email: DTO.email }
		});
		if(existUserEmail) throw new UserAlreadyExistEmailError(DTO.email);

		const existCode = await redis.get(`register_code:${DTO.email}`)
		if(existCode) throw new AlreadySended(DTO.email);

		const code = generateCode();
		await redis.setEx(`register_code:${DTO.email}`, 60 * 5, `${code.toString()}`);
		await redis.setEx(
			`register_code_extraData:${DTO.email}`,
			60 * 5,
			JSON.stringify({
				login: DTO.login,
				password: DTO.password
			})
		)
		const transport = transporter('gmail', process.env.MAIL_USER!, process.env.MAIL_PASS!);
		await sendEmail(DTO.email, 'Code', `Ваш код для регистраций: ${code}`, transport);

	}

	async verifyRegister(email: string, code: string): Promise<Omit<User, 'password'>> {
		const savedCode = await redis.get(`register_code:${email}`);
		if(!savedCode) throw new Expired_Or_Notfound(savedCode);
		if(savedCode !== code) throw new WrongMatch(savedCode, code);
		const extraData = await redis.get(`register_code_extraData:${email}`);
		const { login, password } = JSON.parse(extraData!);

		const hashedPass = await bcrypt.hash(password, 10);

		const createdUser = await prisma.user.create({
			data: {
				login: login,
				email: email,
				password: hashedPass
			}
		})

		await redis.del(`register_code:${email}`);
		await redis.del(`register_code_extraData:${email}`);
		

		return new User(
			createdUser.id,
			createdUser.login,
			createdUser.email,
			''
		)
	}

	async login(DTO: logindDTO): Promise<void> {
		const searchUser = await prisma.user.findUnique({
			where: { email: DTO.email }
		});
		if(!searchUser) throw new CannotFindEmail(DTO.email);

		const comparePass = await bcrypt.compare(DTO.password!, searchUser.password!);
		if(!comparePass) throw new WrongPassword();

		const code = generateCode();
		await redis.setEx(`login_code:${DTO.email}`, 60 * 5, `${code.toString()}`);
		await redis.setEx(`login_code_extraData:${DTO.email}`, 60 * 5, JSON.stringify(searchUser));

		const transport = transporter('gmail', process.env.MAIL_USER!, process.env.MAIL_PASS!);
		sendEmail(DTO.email, 'Login Code', `Код для входа в аккаунт: ${code}`, transport)
		console.log('Код на вход аккаунта успешно отправлен на почту: ', DTO.email);
	}

	async verifyLogin(email: string, code: string): Promise<Omit<User, 'password'>> {
		const getKey = await redis.get(`login_code:${email}`);
		const extraData = await redis.get(`login_code_extraData:${email}`);
		if(!getKey) throw new Expired_Or_Notfound(getKey);
		if(!extraData) throw new Expired_Or_Notfound(extraData);
		if(getKey !== code) throw new WrongMatch(getKey, code);

		const user = JSON.parse(extraData);

		await redis.del(`login_code:${email}`);
		await redis.del(`login_code_extraData:${email}`);

		return new User(
			user.id,
			user.login,
			user.email,
			''
		);
	}

	async findByGoogleId(googleId: string): Promise<User | null> {
		return await prisma.user.findUnique({
			where: {googleId: googleId}
		});
	}

	async findByEmail(email: string): Promise<User | null> {
		return await prisma.user.findUnique({
			where: {email: email}
		});
	}

	async createGoogleAccount(acc: { sub: string; name: string; email: string; avatar: string; }): Promise<User> {
		const user = await prisma.user.create({
			data: {
				login: acc.name,
				email: acc.email,
				googleId: acc.sub,
				authProvider: "GOOGLE",
				avatarUrl: acc.avatar
			}
		})
		return new User(
			user.id,
			user.login,
			user.email,
			null,
			user.avatarUrl,
			user.googleId
		)
	};

	async createRefreshToken(userId: number): Promise<string> {
		const refreshID = crypto.randomUUID();
		await redis.setEx(`refreshToken:${refreshID}`, 60 * 60 * 24 * 7, String(userId))
		return refreshID;
	};

	async verifyRefreshToken(token: string){
		const result = await redis.get(`refreshToken:${token}`);
		if (!result) return null;

		return parseInt(result);
	};

	async findUserById(userId: number): Promise<Omit<User, 'password'>> {
		const user = await prisma.user.findUnique({
			where: {id: userId}
		});
		if(!user) throw new CannotFindUserId();
		return new User(
			user.id,
			user.login,
			user.email,
			'',
			user.avatarUrl,
			user.googleId
		)
	}
};