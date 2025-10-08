import { UserController } from '../controllers/User.controller'
import { authVerify } from '../middlewares/authVerify.middleware'

import { Router } from 'express'

const router = Router()

router.post('/auth/register', UserController.register)
router.post('/auth/registerVerify', UserController.verifyRegister)
router.post('/auth/login', UserController.login)
router.post('/auth/loginVerify', UserController.verifyLogin)
router.get('/auth/logout', UserController.logout)

router.get('/auth/google', UserController.startAuthGoogle)
router.get('/auth/google/callback', UserController.googleCallback)

router.get('/account/accessToken', UserController.getAccessToken)
router.get('/account/me', authVerify, UserController.getUser)

// Friends routes
router.get('/friends', authVerify, UserController.getUserFriends)
router.post('/friends/send-request', authVerify, UserController.sentFriendRequest)
router.post('/friends/accept-request', authVerify, UserController.acceptFriendRequest)
router.post('/friends/decline-request', authVerify, UserController.declineFriendRequest)
router.get('/friends/received-requests', authVerify, UserController.getReceivedRequests)
router.get('/friends/sended-requests', authVerify, UserController.getSendedRequests)

export default router