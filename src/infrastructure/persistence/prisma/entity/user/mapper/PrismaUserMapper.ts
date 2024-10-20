import { User } from '@core/domain/user/entity/User';
import {
  PrismaUserEntity,
  PrismaUserEntityIncluded,
} from 'src/infrastructure/persistence/prisma/entity/user/PrismaUser';

export class PrismaUserMapper {
  static toDomain(entity: PrismaUserEntity & PrismaUserEntityIncluded): User {
    return new User({
      id: entity.id,
      username: entity.username,
      email: entity.email,
      displayName: entity.display_name,
      avatar: entity.avatar,
      bio: entity.bio,
      encryptPassword: entity.password,
      createdAt: entity.created_at,
      updatedAt: entity.updated_at,
    });
  }

  static toDomains(
    entities: (PrismaUserEntity & PrismaUserEntityIncluded)[],
  ): User[] {
    return entities.map((entity) => this.toDomain(entity));
  }

  static toEntity(domain: User): PrismaUserEntity {
    return {
      id: domain.getId(),
      username: domain.getUsername(),
      email: domain.getEmail(),
      display_name: domain.getDisplayName(),
      avatar: domain.getAvatar(),
      bio: domain.getBio(),
      password: domain.getEncryptPassword(),
      created_at: domain.getCreatedAt(),
      updated_at: domain.getUpdatedAt(),
    };
  }

  static toEntities(domains: User[]): PrismaUserEntity[] {
    return domains.map((domain) => this.toEntity(domain));
  }
}
