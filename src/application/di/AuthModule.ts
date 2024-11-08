import { AuthController } from '@application/api/http-rest/controller/authentication/AuthController';
import { InfrastructureModule } from '@application/di/InfrastructureModule';
import { AuthDiToken } from '@core/domain/authentication/di/AuthDiToken';
import { AuthService } from '@core/domain/authentication/service/AuthService';
import { RegisterUseCase } from '@core/useCase/authentication/RegisterUseCase';
import { Module, Provider } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ApiServerConfig } from 'src/infrastructure/config/ApiServerConfig';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@core/domain/authentication/strategy/jwtStrategy';
import { LocalStrategy } from '@core/domain/authentication/strategy/localStrategy';
import { UserDiToken } from '@core/domain/user/di/UserDiToken';
import { UserModule } from '@application/di/UserModule';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from '@core/domain/authentication/guard/RoleGuard';

const persistenceProviders: Provider[] = [];
const serviceProvider: Provider[] = [
  {
    provide: AuthDiToken.AuthService,
    useFactory: (userRepository, jwtService) =>
      new AuthService(userRepository, jwtService),
    inject: [UserDiToken.UserRepository, JwtService],
  },
];

const useCaseProvider: Provider[] = [
  {
    provide: AuthDiToken.RegisterUseCase,
    useFactory: (userRepository) => new RegisterUseCase(userRepository),
    inject: [UserDiToken.UserRepository],
  },
];

const authProvider: Provider[] = [
  {
    provide: AuthDiToken.JwtStrategy,
    useFactory: () => new JwtStrategy(),
  },
  {
    provide: AuthDiToken.LocalStrategy,
    useFactory: (authService) => new LocalStrategy(authService),
    inject: [AuthDiToken.AuthService],
  },
  {
    provide: RolesGuard,
    useFactory: (reflector) => new RolesGuard(reflector),
    inject: [Reflector],
  },
];

@Module({
  controllers: [AuthController],
  providers: [
    ...persistenceProviders,
    ...serviceProvider,
    ...useCaseProvider,
    ...authProvider,
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
  imports: [
    InfrastructureModule,
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: ApiServerConfig.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  exports: [AuthDiToken.JwtStrategy, AuthDiToken.LocalStrategy, RolesGuard],
})
export class AuthModule {}
