import { Injectable } from '@nestjs/common'
import { TokenUtils } from '../common/utils/token.utils'
import { Socket } from 'socket.io'

@Injectable()
export class WsAuthMiddleware {
  constructor(private tokenUtils: TokenUtils) {}

  use() {
    return async (socket: Socket, next: (err?: Error) => void) => {
      try {
        const cookieString = socket.handshake.headers.cookie
        const cookies = this.parseCookies(cookieString)
        const token = cookies.refreshToken

        if (!token) {
          return next(new Error('No token provided'))
        }

        const userId = await this.tokenUtils.verifyRefreshToken(token)
        socket['userId'] = userId
        next()
      } catch (error) {
        next(new Error('Authentication failed'))
      }
    }
  }

  private parseCookies(cookieString: string | undefined): Record<string, string> {
    if (!cookieString) return {}
    
    return cookieString.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=')
      acc[key] = value
      return acc
    }, {})
  }
}