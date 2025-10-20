import { User } from '@prisma/client'

export type UserResponse = Omit<User, 'password'>

export type UserWithFriends = UserResponse & {
	friends: UserResponse[]
}

// Или используйте Prisma Select для получения связанных данных
// export type UserWithFriendships = User & {
//   sentFriendship: (Friendship & { addressee: User })[];
//   recivedFriendship: (Friendship & { requester: User })[];
// };