import { JapaneseWord } from '@core/domain/jisho/entity/JapaneseWord';
import {
  CountWordParams,
  FindJapaneseWordParams,
  FindJapaneseWordsParams,
  JapaneseWordRepositoryPort,
} from '@core/domain/jisho/port/persistence/JapaneseWordRepositoryPort';
import { PrismaService } from '@core/service/PrismaService';
import { PrismaJapaneseWordMapper } from 'src/infrastructure/persistence/prisma/entity/jisho/mapper/PrismaJapaneseWordMapper';
import { buildQueryPagination } from 'src/infrastructure/persistence/prisma/utility/PrismaQueryUtility';

export default class PrismaJapaneseWordRepositoryAdapter
  implements JapaneseWordRepositoryPort
{
  constructor(private prismaService: PrismaService) {}
  async findWord(params: FindJapaneseWordParams): Promise<JapaneseWord> {
    const entity = await this.prismaService.japanese_words.findFirst({
      ...params,
    });

    if (!entity) {
      return null;
    }

    return PrismaJapaneseWordMapper.toDomain(entity);
  }

  async findWords(params: FindJapaneseWordsParams): Promise<JapaneseWord[]> {
    const entities = await this.prismaService.japanese_words.findMany({
      where: params.where,
      include: params.include,
      orderBy: params.orderBy,
      ...buildQueryPagination(params.pagination),
    });

    return PrismaJapaneseWordMapper.toDomains(entities);
  }

  async countWords(params: CountWordParams): Promise<number> {
    return this.prismaService.japanese_words.count(params);
  }
}
