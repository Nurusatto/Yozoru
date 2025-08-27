// Repositories
import { UserRepositoryImpl } from './infrastructure/db/implements/userImplement/User.repositoryImpl';

// User-Use-Cases
import { Register } from './domain/use-cases/User-Cases/Register.use-case';
import { VerifyRegister } from './domain/use-cases/User-Cases/verifyRegister.use-case';
import { Login } from './domain/use-cases/User-Cases/login.use-case';
import { VerifyLogin } from './domain/use-cases/User-Cases/verifyLogin.use-case';
import { GoogleAuth } from './domain/use-cases/User-Cases/googleAuth.use-case';

const userRepository = new UserRepositoryImpl();

export const register = new Register(userRepository);
export const verifyRegister = new VerifyRegister(userRepository);
export const login = new Login(userRepository);
export const verifyLogin = new VerifyLogin(userRepository);
export const googleAuth = new GoogleAuth(userRepository);