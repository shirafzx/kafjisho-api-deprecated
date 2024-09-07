import { JapaneseWord } from '@core/domain/jisho/entity/JapaneseWord';
import {
  PrismaJapaneseWordEntity,
  PrismaJapaneseWordEntityIncluded,
} from '../PrismaJapaneseWord';
import { PrismaJpThMeaningMapper } from 'src/infrastructure/persistence/prisma/entity/jisho/mapper/PrismaJPTHMeaningMapper';

export class PrismaJapaneseWordMapper {
  static toDomain(
    entity: PrismaJapaneseWordEntity & PrismaJapaneseWordEntityIncluded,
  ): JapaneseWord {
    const jpThMeanings = entity.jp_th_meanings
      ? PrismaJpThMeaningMapper.toDomains(entity.jp_th_meanings)
      : null;

    return new JapaneseWord({
      id: entity.id,
      word: entity.word,
      furigana: entity.furigana,
      createdAt: entity.created_at,
      updatedAt: entity.updated_at,
      jpThMeanings,
    });
  }

  static toDomains(entities: PrismaJapaneseWordEntity[]): JapaneseWord[] {
    return entities.map((entity) => this.toDomain(entity));
  }

  static toEntity(domain: JapaneseWord): PrismaJapaneseWordEntity {
    return {
      id: domain.getId(),
      word: domain.getWord(),
      furigana: domain.getFurigana(),
      created_at: domain.getCreatedAt(),
      updated_at: domain.getUpdatedAt(),
    };
  }

  static toEntities(domains: JapaneseWord[]): PrismaJapaneseWordEntity[] {
    return domains.map((domain) => this.toEntity(domain));
  }
}
