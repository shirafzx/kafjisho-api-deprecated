import { AuthController } from '@application/api/http-rest/controller/authentication/AuthController';
import { InfrastructureModule } from '@application/di/InfrastructureModule';
import { CoreDiToken } from '@common/di/CoreDiToken';
import { AuthDiToken } from '@core/domain/authentication/di/AuthDiToken';
import { AuthService } from '@core/domain/authentication/service/AuthService';
import { RegisterUseCase } from '@core/usecase/authentication/RegisterUseCase';
import { Module, Provider } from '@nestjs/common';
import PrismaUserRepositoryAdapter from 'src/infrastructure/persistence/prisma/repository/authentication/PrismaUserRepositoryAdapter';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ApiServerConfig } from 'src/infrastructure/config/ApiServerConfig';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@core/domain/authentication/strategy/jwtStrategy';
import { LocalStrategy } from '@core/domain/authentication/strategy/localStrategy';

const persistenceProviders: Provider[] = [
  {
    provide: AuthDiToken.UserRepository,
    useFactory: (prisma) => new PrismaUserRepositoryAdapter(prisma),
    inject: [CoreDiToken.Prisma],
  },
];
const serviceProvider: Provider[] = [
  {
    provide: AuthDiToken.AuthService,
    useFactory: (userRepository, jwtService) =>
      new AuthService(userRepository, jwtService),
    inject: [AuthDiToken.UserRepository, JwtService],
  },
];

const useCaseProvider: Provider[] = [
  {
    provide: AuthDiToken.RegisterUseCase,
    useFactory: (userRepository) => new RegisterUseCase(userRepository),
    inject: [AuthDiToken.UserRepository],
  },
];

const strategyProvider: Provider[] = [
  {
    provide: AuthDiToken.JwtStrategy,
    useFactory: () => new JwtStrategy(),
  },
  {
    provide: AuthDiToken.LocalStrategy,
    useFactory: (authService) => new LocalStrategy(authService),
    inject: [AuthDiToken.AuthService],
  },
];

@Module({
  controllers: [AuthController],
  providers: [
    ...persistenceProviders,
    ...serviceProvider,
    ...useCaseProvider,
    ...strategyProvider,
  ],
  imports: [
    InfrastructureModule,
    PassportModule,
    JwtModule.register({
      secret: ApiServerConfig.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  exports: [],
})
export class AuthModule {}
