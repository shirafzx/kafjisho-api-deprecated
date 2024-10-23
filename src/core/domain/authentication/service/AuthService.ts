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
      include: {
        user_roles: {
          include: {
            role: true,
          },
        },
      },
    });

    if (user && (await bcrypt.compare(password, user.getEncryptPassword()))) {
      return {
        username: user.getUsername(),
        userId: user.getId(),
        roles: user
          .getUserRoles()
          .map((userRole) => userRole.getRole().getName()),
      };
    }

    return null;
  }

  async createAccessToken(user: CreateAccessTokenParams) {
    const payload = {
      username: user.username,
      userId: user.userId,
      roles: user.roles,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
