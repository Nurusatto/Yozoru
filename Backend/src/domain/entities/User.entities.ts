export class User {
	constructor(
	public id: number,
	public login: string,
	public email: string,
	public password: string | null,
	public avatarUrl?: string | null,
	public googleId?: string | null
	) {};

}

export type registerDTO = Omit<User, 'id'>
export type logindDTO = Omit<User, 'id' | 'login'>