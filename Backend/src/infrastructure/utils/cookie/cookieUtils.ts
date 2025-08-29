import { Response } from "express";

export class CookieUtils {
  static setRefreshToken(res: Response, refreshToken: string) {
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }

  static clearRefreshToken(res: Response) {
    res.clearCookie("refreshToken");
  }
}
