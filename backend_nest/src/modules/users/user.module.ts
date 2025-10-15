import { Module } from '@nestjs/common'
import { PrismaService } from 'src/db/prismaService/prisma.service'
import { UserRepository } from './repositories/user.repository'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { JwtUtils } from 'src/common/utils/jwt.utils'
import { TokenUtils } from 'src/common/utils/token.utils'
import { RedisModule } from 'src/db/redis/redis.module'



@Module({
	imports: [RedisModule],
	providers: [PrismaService, UserRepository, UserService, JwtUtils, TokenUtils],
	controllers: [UserController],
	exports: [UserRepository, UserService]
})
export class UserModule {}
