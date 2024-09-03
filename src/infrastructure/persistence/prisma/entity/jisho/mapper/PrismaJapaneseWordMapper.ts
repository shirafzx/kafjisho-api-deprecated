import { JapaneseWord } from '@core/domain/jisho/entity/JapaneseWord';
import { PrismaJapaneseWordEntity } from '../PrismaJapaneseWord';

export class PrismaJapaneseWordMapper {
  static toDomain(entity: PrismaJapaneseWordEntity): JapaneseWord {
    return new JapaneseWord({
      id: entity.id,
      word: entity.word,
      furigana: entity.furigana,
      createdAt: entity.created_at,
      updatedAt: entity.updated_at,
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
