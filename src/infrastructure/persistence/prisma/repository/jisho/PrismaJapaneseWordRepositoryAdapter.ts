import { JapaneseWord } from '@core/domain/jisho/entity/JapaneseWord';
import {
  FindJapaneseWordParams,
  JapaneseWordRepositoryPort,
} from '@core/domain/jisho/port/persistence/japaneseWordRepositoryPort';
import { PrismaService } from '@core/service/PrismaService';
import { PrismaJapaneseWordMapper } from 'src/infrastructure/persistence/prisma/entity/jisho/mapper/PrismaJapaneseWordMapper';

export default class PrismaJapaneseWordRepositoryAdapter
  implements JapaneseWordRepositoryPort
{
  constructor(private prismaService: PrismaService) {}
  async findWord(params: FindJapaneseWordParams): Promise<JapaneseWord> {
    const japaneseWord = await this.prismaService.japanese_words.findFirst({
      ...params,
    });

    if (!japaneseWord) return null;

    return PrismaJapaneseWordMapper.toDomain(japaneseWord);
  }
}
