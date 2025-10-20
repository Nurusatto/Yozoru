import { BadRequestException, Body, Controller, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common'
import type { Request } from 'express'
import { AuthGuard } from '../../guards/auth.guard'
import { UserService } from '../users/user.service'
import { sendFriendDto } from './dto/sendFriend.dto'
import { FriendshipService } from './friendship.service'

@Controller('friendship')
@UseGuards(AuthGuard)
export class FriendshipController {
  constructor(
    private readonly friendshipService: FriendshipService,
    private userService: UserService
  ) { }

  @Post('send')
  @HttpCode(201)
  async sendRequest(@Body() dto: sendFriendDto, @Req() req: Request) {
    const receiverId = await this.userService.getUserByUID(dto.UID)
    if (!receiverId) {
      throw new BadRequestException('Такого пользователя не существует или не найдено')
    }
    const sendRequest = await this.friendshipService.sendFriendRequest(req.userId, receiverId.id)
    return {
      success: "true",
      message: "Запрос на дружбу успешно отправлен!",
      sendRequest
    }
  }

  @Post('accept')
  @HttpCode(200)
  async acceptRequest(@Body('receiverId') receiverId: number, @Req() req: Request) {
    const result = await this.friendshipService.acceptFriendRequest(req.userId, receiverId)
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
    return {
      success: true,
      messsage: "Вы успешно отклонили запрос друга!",
      data: result
    }
  }

  @Get('friends')
  @HttpCode(200)
  async getMyFriends(@Req() req: Request) {
    const friends = await this.friendshipService.getFriends(req.userId)
    return {
      success: true,
      message: "Список ваших друзей",
      friends
    }
  }

  @Get('received-friends')
  @HttpCode(200)
  async getMyRecivedFriends(@Req() req: Request) {
    const friends = await this.friendshipService.getReceivedFriends(req.userId)
    return {
      success: true,
      message: "Список полученных запросов друзей",
      friends
    }
  }

  @Get('sended-friends')
  @HttpCode(200)
  async getMySendedFriends(@Req() req: Request) {
    const friends = await this.friendshipService.getSendedFriends(req.userId)
    return {
      success: true,
      message: "Список отправленных запросов друзей",
      friends
    }
  }
}
