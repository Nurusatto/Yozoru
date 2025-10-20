import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { TokenUtils } from '../common/utils/token.utils';
import { Socket } from 'socket.io';

const parseCookieString = (cookieString: string | undefined): Record<string, string> => {
  if (!cookieString) {
    return {};
  }
  return cookieString.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {});
};

@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor(private tokenUtils: TokenUtils) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client: Socket = context.switchToWs().getClient<Socket>();

    const cookieString = client.handshake.headers.cookie;

    const cookies = parseCookieString(cookieString);
    const token = cookies.refreshToken;

    if (!token) {
      return false;
    }

    try {
      const userId = await this.tokenUtils.verifyRefreshToken(token);
      client['userId'] = userId;
      return true;
    } catch {
      return false;
    }
  }
}