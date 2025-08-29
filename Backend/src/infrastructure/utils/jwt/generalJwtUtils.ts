import jwt from 'jsonwebtoken';

export class JWT_Utils {
  static generateTokens(userId: number) {
    const accessToken = jwt.sign(
      { userId },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { userId },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return { accessToken, refreshToken };
  }

  static verifyToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET!);
  }
};