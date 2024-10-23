import { CoreDiToken } from '@common/di/CoreDiToken';
import { Module, Provider } from '@nestjs/common';
import PrismaUserRepositoryAdapter from 'src/infrastructure/persistence/prisma/repository/user/PrismaUserRepositoryAdapter';
import { UserDiToken } from '@core/domain/user/di/UserDiToken';
import { InfrastructureModule } from '@application/di/InfrastructureModule';

const persistenceProviders: Provider[] = [
  {
    provide: UserDiToken.UserRepository,
    useFactory: (prisma) => new PrismaUserRepositoryAdapter(prisma),
    inject: [CoreDiToken.Prisma],
  },
];
const serviceProvider: Provider[] = [];

const useCaseProvider: Provider[] = [];

@Module({
  controllers: [],
  providers: [...persistenceProviders, ...serviceProvider, ...useCaseProvider],
  imports: [InfrastructureModule],
  exports: [UserDiToken.UserRepository],
})
export class UserModule {}
