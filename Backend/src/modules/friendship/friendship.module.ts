import { Module } from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { FriendshipController } from './friendship.controller';
import { UserModule } from '../users/user.module'
import { FriendshipRepository } from './repositories/friendship.repository'
import { FriendshipGetListRepository } from './repositories/friendship-getList.repository'
import { CommonModule } from '../../common/common.module'

@Module({
  imports: [UserModule, CommonModule],
  controllers: [FriendshipController],
  providers: [FriendshipService, FriendshipRepository, FriendshipGetListRepository],
  exports: [FriendshipService, FriendshipRepository, FriendshipGetListRepository]
})
export class FriendshipModule {}
