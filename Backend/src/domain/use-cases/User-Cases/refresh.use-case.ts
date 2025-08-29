import { UserRepository } from '../../repositories/User.repository';

export class RefreshUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(refreshToken: string) {
    const userId = await this.userRepository.verifyRefreshToken(refreshToken);
    if (!userId) throw new Error("Refresh token expired or invalid");

    const newRefreshToken = await this.userRepository.rotateRefreshToken(userId, refreshToken);

    const newAccessToken = this.userRepository.generateAccessToken(userId);

    return { accessToken: newAccessToken, refreshToken: newRefreshToken, userId };
  }
}
