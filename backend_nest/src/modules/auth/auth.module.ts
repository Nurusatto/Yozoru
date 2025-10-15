import { Module } from '@nestjs/common'
import { CommonModule } from 'src/common/common.module'
import { PrismaModule } from 'src/db/prismaService/prisma.module'
import { RedisModule } from 'src/db/redis/redis.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { RegisterRepository } from './repositories/register.repository'
import { LoginRepository } from './repositories/login.repository'
import { UserModule } from '../users/user.module'
import { GoogleAuthRepository } from './repositories/google-auth.repository'

@Module({
  imports: [RedisModule, PrismaModule, CommonModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService, RegisterRepository, LoginRepository, GoogleAuthRepository],
  exports: [AuthService, RegisterRepository, LoginRepository, GoogleAuthRepository],
})
export class AuthModule { }