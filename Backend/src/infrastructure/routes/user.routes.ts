import { UserController } from '../controllers/User.controller';
import { Router } from 'express';

const router = Router();

router.post('/auth/register', UserController.register);
router.post('/auth/registerVerify', UserController.verifyRegister);
router.post('/auth/login', UserController.login);
router.post('/auth/loginVerify', UserController.verifyLogin);
router.get('/auth/logout', UserController.logout);

router.get('/auth/google', UserController.startAuthGoogle);
router.get('/auth/google/callback', UserController.googleCallback);

router.get('/account/me', UserController.getAccessToken);

export default router;