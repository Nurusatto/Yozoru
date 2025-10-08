import { User, logindDTO, registerDTO } from '../entities/User.entities'

export interface UserRepository {
	// Sign In / Login functions
	register(DTO: registerDTO): Promise<void>
	verifyRegister(email: string, code: string): Promise<Omit<User, 'password'>>
	login(DTO: logindDTO): Promise<void>
	verifyLogin(email: string, code: string): Promise<Omit<User, 'password'>>

	// OAuth2 ---- Google //
	findByGoogleId(googleId: string): Promise<User | null>
	findByEmail(email: string): Promise<User | null>
	createGoogleAccount(acc: {
		sub: string,
		email?: string,
		name?: string,
		avatar?: string
	}): Promise<User>

	// redis
	createRefreshToken(userId: number): Promise<string>
	verifyRefreshToken(token: string): Promise<number | null>

	// Another funcitons
	findUserById(userId: number): Promise<Omit<User, 'password'>>

	// Online Functions

	// Show Friends Requsets / Show Friends
	getUserFriends(userId: number): Promise <User[]>
	receivedRequestList(userId: number): Promise <User[]>
	sendedRequestList(userId: number): Promise <User[]>

	// Friends Functions
	sentFriendRequest(receiveUserUID: string, userId: number): Promise<User>
	acceptFriendRequest(user: User, recivedUser: string): Promise<User>
	declineFriendRequest(user: User, recivedUser: string): Promise<User>
	removeFriend(userId: number, friendUID: string): Promise<void>
	cancelSentRequest(userId: number, addresseeUID: string): Promise<void>
	
	// Search Users
	findUserByUID(UID: string): Promise<User | null>
}
