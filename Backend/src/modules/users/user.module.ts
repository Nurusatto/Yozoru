import { Module } from '@nestjs/common'
import { PrismaService } from '../../db/prismaService/prisma.service'
import { UserRepository } from './repositories/user.repository'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { JwtUtils } from '../../common/utils/jwt.utils'
import { TokenUtils } from '../../common/utils/token.utils'
import { RedisModule } from '../../db/redis/redis.module'



@Module({
	imports: [RedisModule],
	providers: [PrismaService, UserRepository, UserService, JwtUtils, TokenUtils],
	controllers: [UserController],
	exports: [UserRepository, UserService]
})
export class UserModule {}
