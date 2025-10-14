export class User {
	constructor(
		public id: number,
		public login: string,
		public email: string,
		public password: string | null,
		public avatarUrl?: string | null,
		public googleId?: string | null,
		public UID?: string | null,
		public views?: number | null,
		public bannerUrl?: string | null,
	) { };

}

export class UserWithFriends extends User {
	constructor(
		public user: User,
		public friends: User[]
	) {
		super(
			user.id,
			user.login, 
			user.email,
			user.password,
			user.avatarUrl,
			user.googleId,
			user.UID,
			user.views,
			user.bannerUrl,
		)
	};

}

export type registerDTO = Omit<User, 'id'>
export type logindDTO = Omit<User, 'id' | 'login'>