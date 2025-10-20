import { Body, Controller, Get, HttpCode, HttpStatus, Next, Post, Req, Res } from '@nestjs/common'
import type { NextFunction, Response } from 'express'
import { CookieUtils } from '../../common/utils/cookie.utils'
import { JwtUtils } from '../../common/utils/jwt.utils'
import { TokenUtils } from '../../common/utils/token.utils'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'
import { VerifyDto } from './dto/verify.dto'

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtUtils: JwtUtils,
    private tokenUtils: TokenUtils
  ) { }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(@Body() dto: RegisterDto) {
    await this.authService.register(dto)

    return {
      success: true,
      message: 'На вашу почту отправлен код!',
    }
  }

  @Post('verify-register')
  @HttpCode(HttpStatus.OK)
  async verifyRegister(
    @Body() dto: VerifyDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log('verifyRegister dto:', dto)
    const user = await this.authService.verifyRegister(dto)

    const accessToken = this.jwtUtils.generateAccessToken(user.id)

    const refreshToken = await this.tokenUtils.createRefreshToken(user.id)

    CookieUtils.setRefreshToken(res, refreshToken)

    return {
      success: true,
      message: 'Вы успешно зарегистрировались!',
      user,
      accessToken,
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.login(dto)
    return {
      success: true,
      message: 'На вашу почту отправлен код!',
    }
  }

  @Post('verify-login')
  @HttpCode(HttpStatus.OK)
  async verifyLogin(
    @Body() dto: VerifyDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.verifyLogin(dto)

    const accessToken = this.jwtUtils.generateAccessToken(user.id)
    const refreshToken = await this.tokenUtils.createRefreshToken(user.id)

    CookieUtils.setRefreshToken(res, refreshToken)
    return {
      success: true,
      message: 'Вы успешно вошли в свой аккаунт!',
      user,
      accessToken,
    }
  }

  @Get('logout')
  logout(@Res() res: Response, @Next() next: NextFunction) {
    try {
      CookieUtils.clearRefreshToken(res)
      res.status(200).json({ success: true, message: "Вы вышли из аккаунта" })
    } catch (err) {
      next(err)
    }
  }

  @Get('google')
  async startAuthGoogle(@Res() res: Response) {
    const client = await this.authService.getClient()

    const url = client.authorizationUrl({
      scope: "openid email profile",
    })

    res.redirect(url)
  }

  @Get('google/callback')
  async googleCallback(@Res() res: Response, @Req() req: Request, @Next() next: NextFunction) {
    try {
      const client = await this.authService.getClient()

      const params = client.callbackParams(req as any)
      const tokenSet = await client.callback(process.env.GOOGLE_REDIRECT_URI!, params)
      const userInfo = await client.userinfo(tokenSet.access_token!)

      const dto = {
        sub: userInfo.sub,
        email: userInfo.email,
        name: userInfo.name,
        avatar: userInfo.picture
      }

      const user = await this.authService.googleAuth(dto)

      const refreshToken = await this.tokenUtils.createRefreshToken(user!.id)

      CookieUtils.setRefreshToken(res, refreshToken)

      res.redirect("http://localhost:5173")

    } catch (err) {

    }
  }
}