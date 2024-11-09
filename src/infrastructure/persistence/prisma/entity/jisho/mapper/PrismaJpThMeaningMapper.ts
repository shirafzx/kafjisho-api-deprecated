import {
  PrismaJpThMeaningEntity,
  PrismaJpThMeaningEntityIncluded,
} from 'src/infrastructure/persistence/prisma/entity/jisho/PrismaJpThMeaning';
import { JpThMeaning } from '@core/domain/jisho/entity/JpThMeaning';
import { PrismaThaiWordMapper } from 'src/infrastructure/persistence/prisma/entity/jisho/mapper/PrismaThaiWordMapper';

export class PrismaJpThMeaningMapper {
  static toDomain(
    entity: PrismaJpThMeaningEntity & PrismaJpThMeaningEntityIncluded,
  ): JpThMeaning {
    const thaiWord = entity.thai_word
      ? PrismaThaiWordMapper.toDomain(entity.thai_word)
      : null;

    return new JpThMeaning({
      id: entity.id,
      japaneseWordId: entity.japanese_word_id,
      thaiWordId: entity.japanese_word_id,
      explanation: entity.explanation,
      createdAt: entity.created_at,
      updatedAt: entity.updated_at,
      thaiWord,
    });
  }

  static toDomains(
    entities: (PrismaJpThMeaningEntity & PrismaJpThMeaningEntityIncluded)[],
  ): JpThMeaning[] {
    return entities.map((entity) => this.toDomain(entity));
  }

  static toEntity(domain: JpThMeaning): PrismaJpThMeaningEntity {
    if (!domain) return null;

    return {
      id: domain.getId(),
      japanese_word_id: domain.getJapaneseWordid(),
      thai_word_id: domain.getThaiWordid(),
      explanation: domain.getExplanation(),
      created_at: domain.getCreatedAt(),
      updated_at: domain.getUpdatedAt(),
    };
  }

  static toEntities(domains: JpThMeaning[]): PrismaJpThMeaningEntity[] {
    return domains.map((domain) => this.toEntity(domain));
  }
}
