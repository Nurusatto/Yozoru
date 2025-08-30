import jwt from 'jsonwebtoken';

export class JWT_Utils {
  static generateAccessToken(userId: number) {
    const accessToken = jwt.sign(
      { userId },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" }
    );

    return accessToken;
  }

  static verifyToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET!);
  }
};