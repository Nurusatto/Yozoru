// Repositories
import { UserRepositoryImpl } from "./infrastructure/db/implements/userImplement/User.repositoryImpl"

// User-Use-Cases
import { AcceptFriendRequest } from './domain/use-cases/User-Cases/acceptFriendRequest.use-case'
import { CancelSentRequest } from './domain/use-cases/User-Cases/cancelSentRequest.use-case'
import { CreateAccess } from "./domain/use-cases/User-Cases/createAccess.use.case"
import { CreateRefresh } from "./domain/use-cases/User-Cases/createRefresh.use-case"
import { DeclineFriendRequest } from './domain/use-cases/User-Cases/declineFriendRequest.use-case'
import { FindUserByUID } from './domain/use-cases/User-Cases/findUserByUID.use-case'
import { GetUserById } from "./domain/use-cases/User-Cases/getUserById.use-case"
import { GetUserFriends } from './domain/use-cases/User-Cases/getUserFriends.use-case'
import { GetUserIdFromRefreshToken } from "./domain/use-cases/User-Cases/getUserIdFromRefreshToken.use-case"
import { GoogleAuth } from "./domain/use-cases/User-Cases/googleAuth.use-case"
import { Login } from "./domain/use-cases/User-Cases/login.use-case"
import { ReceivedRequestList } from './domain/use-cases/User-Cases/receivedRequestList.use-case'
import { Register } from "./domain/use-cases/User-Cases/register.use-case"
import { RemoveFriend } from './domain/use-cases/User-Cases/removeFriend.use-case'
import { SendedRequestList } from './domain/use-cases/User-Cases/sendedRequestList.use-case'
import { SentFriendRequest } from './domain/use-cases/User-Cases/sentFriendRequest.use-case'
import { VerifyLogin } from "./domain/use-cases/User-Cases/verifyLogin.use-case"
import { VerifyRegister } from "./domain/use-cases/User-Cases/verifyRegister.use-case"

const userRepository = new UserRepositoryImpl()

export const register = new Register(userRepository)
export const verifyRegister = new VerifyRegister(userRepository)
export const login = new Login(userRepository)
export const verifyLogin = new VerifyLogin(userRepository)
export const googleAuth = new GoogleAuth(userRepository)
export const createRefresh = new CreateRefresh(userRepository)
export const createAccess = new CreateAccess(userRepository)
export const getUserIdFromRefreshToken = new GetUserIdFromRefreshToken(
  userRepository
)
export const getUserById = new GetUserById(userRepository)
export const getUserFriends = new GetUserFriends(userRepository)
export const sentFriendRequest = new SentFriendRequest(userRepository)
export const acceptFriendRequest = new AcceptFriendRequest(userRepository)
export const declineFriendRequest = new DeclineFriendRequest(userRepository)
export const receivedRequestList = new ReceivedRequestList(userRepository)
export const sendedRequestList = new SendedRequestList(userRepository)
export const removeFriend = new RemoveFriend(userRepository)
export const cancelSentRequest = new CancelSentRequest(userRepository)
export const findUserByUID = new FindUserByUID(userRepository)
