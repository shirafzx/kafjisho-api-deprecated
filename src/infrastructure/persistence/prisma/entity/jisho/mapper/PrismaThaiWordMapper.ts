import { ThaiWord } from '@core/domain/jisho/entity/ThaiWord';
import { PrismaThaiWordEntity } from '../PrismaThaiWord';

export class PrismaThaiWordMapper {
  static toDomain(entity: PrismaThaiWordEntity): ThaiWord {
    return new ThaiWord({
      id: entity.id,
      word: entity.word,
      createdAt: entity.created_at,
      updatedAt: entity.updated_at,
    });
  }

  static toDomains(entities: PrismaThaiWordEntity[]): ThaiWord[] {
    return entities.map((entity) => this.toDomain(entity));
  }

  static toEntity(domain: ThaiWord): PrismaThaiWordEntity {
    return {
      id: domain.getId(),
      word: domain.getWord(),
      created_at: domain.getCreatedAt(),
      updated_at: domain.getUpdatedAt(),
    };
  }

  static toEntities(domains: ThaiWord[]): PrismaThaiWordEntity[] {
    return domains.map((domain) => this.toEntity(domain));
  }
}
