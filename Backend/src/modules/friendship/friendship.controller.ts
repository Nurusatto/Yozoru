import { BadRequestException, Body, Controller, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common'
import type { Request } from 'express'
import { AuthGuard } from '../../guards/auth.guard'
import { UserService } from '../users/user.service'
import { sendFriendDto } from './dto/sendFriend.dto'
import { FriendshipService } from './friendship.service'
import { NotificationGateway } from '../../WebSocket/notification/notification.gateway'

@Controller('friendship')
@UseGuards(AuthGuard)
export class FriendshipController {
  constructor(
    private readonly friendshipService: FriendshipService,
    private userService: UserService,
    private notificationGateway: NotificationGateway
  ) { }

  @Post('send')
  @HttpCode(201)
  async sendRequest(@Body() dto: sendFriendDto, @Req() req: Request) {
    const receiverId = await this.userService.getUserByUID(dto.UID)
    if (!receiverId) {
      throw new BadRequestException('Такого пользователя не существует или не найдено')
    }
    const sendRequest = await this.friendshipService.sendFriendRequest(req.userId, receiverId.id)

    const sender = await this.userService.getUserById(req.userId);
    if(!sender){
      throw new BadRequestException('Вы не вошли в аккаунт')
    }

    this.notificationGateway.sendNotificationToUser(receiverId.id, {
      type: 'friend_request',
      title: 'Новый запрос в друзья',
      message: `${sender.login || sender.UID} отправил вам запрос в друзья`,
      senderId: req.userId,
      senderLogin: sender.login,
      senderAvatar: sender.avatarUrl,
      timestamp: new Date().toISOString(),
      data: sendRequest
    })

    return {
      success: "true",
      message: "Запрос на дружбу успешно отправлен!",
      data: sendRequest
    }
  }

  @Post('accept')
  @HttpCode(200)
  async acceptRequest(@Body('receiverId') receiverId: number, @Req() req: Request) {
    const result = await this.friendshipService.acceptFriendRequest(req.userId, receiverId)

    const accepter = await this.userService.getUserById(req.userId)
    if(!accepter){
      throw new BadRequestException('Вы не вошли в аккаунт')
    }

    this.notificationGateway.sendNotificationToUser(receiverId, {
      type: 'friend_accepted',
      title: 'Запрос принят',
      message: `${accepter.login || accepter.UID} принял ваш запрос в друзья`,
      userId: req.userId,
      username: accepter.login,
      avatar: accepter.avatarUrl,
      timestamp: new Date().toISOString(),
      data: result
    })

    return {
      success: true,
      messsage: "Вы успешно приняли запрос друга!",
      data: result
    }
  }

  @Post('decline')
  @HttpCode(200)
  async declineRequest(@Body('receiverId') receiverId: number, @Req() req: Request) {
    const result = await this.friendshipService.declineFriendRequest(req.userId, receiverId)

    const decliner = await this.userService.getUserById(req.userId)
    if(!decliner){
      throw new BadRequestException('Вы не вошли в аккаунт')
    }

    this.notificationGateway.sendNotificationToUser(receiverId, {
      type: 'friend_accepted',
      title: 'Запрос принят',
      message: `${decliner.login || decliner.UID} отклонил ваш запрос в друзья`,
      userId: req.userId,
      username: decliner.login,
      avatar: decliner.avatarUrl,
      timestamp: new Date().toISOString(),
      data: result
    })

    return {
      success: true,
      messsage: "Вы успешно отклонили запрос друга!",
      data: result
    }
  }

  @Get('friends')
  @HttpCode(200)
  async getMyFriends(@Req() req: Request) {
    const friendList = await this.friendshipService.getFriends(req.userId)
    return {
      success: true,
      message: "Список ваших друзей",
      friends: friendList
    }
  }

  @Get('received-friends')
  @HttpCode(200)
  async getMyRecivedFriends(@Req() req: Request) {
    const friendList = await this.friendshipService.getReceivedFriends(req.userId)
    return {
      success: true,
      message: "Список полученных запросов друзей",
      friends: friendList
    }
  }

  @Get('sended-friends')
  @HttpCode(200)
  async getMySendedFriends(@Req() req: Request) {
    const friendList = await this.friendshipService.getSendedFriends(req.userId)
    return {
      success: true,
      message: "Список отправленных запросов друзей",
      friends: friendList
    }
  }
}
