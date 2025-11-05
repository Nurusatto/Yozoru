import { Module } from '@nestjs/common'
import { CommonModule } from '../../common/common.module'
import { PrismaModule } from '../../db/prismaService/prisma.module'
import { RedisModule } from '../../db/redis/redis.module'
import { UserModule } from '../users/user.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { GoogleAuthRepository } from './repositories/google-auth.repository'
import { LoginRepository } from './repositories/login.repository'
import { RegisterRepository } from './repositories/register.repository'
import { authRepository } from './repositories/auth.repository'


@Module({
  imports: [RedisModule, PrismaModule, CommonModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService, RegisterRepository, LoginRepository, GoogleAuthRepository, authRepository],
  exports: [AuthService, RegisterRepository, LoginRepository, GoogleAuthRepository, authRepository],
})
export class AuthModule { }