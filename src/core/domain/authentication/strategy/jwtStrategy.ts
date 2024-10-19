import { CreateAccessTokenParams } from '@core/domain/authentication/type/AuthType';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ApiServerConfig } from 'src/infrastructure/config/ApiServerConfig';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      //   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          return request?.cookies?.access_token;
        },
      ]),
      secretOrKey: ApiServerConfig.JWT_SECRET, // Use the secret from environment variables
      ignoreExpiration: false,
    });
  }

  async validate(payload: CreateAccessTokenParams) {
    // This payload will be the decrypted token payload you provided when signing the token
    return { userId: payload.userId, username: payload.username };
  }
}
