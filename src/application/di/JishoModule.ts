import { JishoController } from '@application/api/http-rest/controller/jisho/JishoController';
import { InfrastructureModule } from '@application/di/InfrastructureModule';
import { CoreDiToken } from '@common/di/CoreDiToken';
import { JishoDiToken } from '@core/domain/jisho/di/JishoDiToken';
import { GetJapaneseWordsUseCase } from '@core/useCase/jisho/GetJapaneseWordsUseCase';
import { Module, Provider } from '@nestjs/common';
import PrismaJapaneseWordRepositoryAdapter from 'src/infrastructure/persistence/prisma/repository/jisho/PrismaJapaneseWordRepositoryAdapter';

const persistenceProviders: Provider[] = [
  {
    provide: JishoDiToken.JapaneseWordRepository,
    useFactory: (prisma) => new PrismaJapaneseWordRepositoryAdapter(prisma),
    inject: [CoreDiToken.Prisma],
  },
];
const serviceProvider: Provider[] = [];
const useCaseProvider: Provider[] = [
  {
    provide: JishoDiToken.GetJapaneseWordsUseCase,
    useFactory: (japaneseWordRepository) =>
      new GetJapaneseWordsUseCase(japaneseWordRepository),
    inject: [JishoDiToken.JapaneseWordRepository],
  },
];

@Module({
  controllers: [JishoController],
  providers: [...persistenceProviders, ...serviceProvider, ...useCaseProvider],
  imports: [InfrastructureModule],
  exports: [],
})
export class JishoModule {}
