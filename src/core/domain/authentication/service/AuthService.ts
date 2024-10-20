import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserRepositoryPort } from '@core/domain/user/port/persistence/UserRepositoryPort';
import { CreateAccessTokenParams } from '@core/domain/authentication/type/AuthType';

export class AuthService {
  constructor(
    private userRepository: UserRepositoryPort,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<CreateAccessTokenParams> {
    const user = await this.userRepository.findUser({
      where: {
        username,
      },
    });

    if (user && (await bcrypt.compare(password, user.getEncryptPassword()))) {
      return {
        username: user.getUsername(),
        userId: user.getId(),
      };
    }

    return null;
  }

  async createAccessToken(params: CreateAccessTokenParams) {
    const payload = { username: params.username, userId: params.userId };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
