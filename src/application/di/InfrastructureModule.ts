import { CoreDiToken } from '@common/di/CoreDiToken';
import { PrismaService } from '@core/service/PrismaService';
import { Module, Provider } from '@nestjs/common';

const providers: Provider[] = [
  {
    provide: CoreDiToken.Prisma,
    useFactory: () => new PrismaService(),
  },
];

@Module({
  controllers: [],
  providers,
  imports: [],
  exports: [CoreDiToken.Prisma],
})
export class InfrastructureModule {}
