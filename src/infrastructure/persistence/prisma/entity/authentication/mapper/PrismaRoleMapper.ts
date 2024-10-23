import { Role } from '@core/domain/authentication/entity/Role';
import { PrismaRoleEntity } from 'src/infrastructure/persistence/prisma/entity/authentication/PrismaRole';

export class PrismaRoleMapper {
  static toDomain(entity: PrismaRoleEntity): Role {
    return new Role({
      id: entity.id,
      name: entity.name,
    });
  }

  static toDomains(entities: PrismaRoleEntity[]): Role[] {
    return entities.map((entity) => this.toDomain(entity));
  }

  static toEntity(domain: Role): PrismaRoleEntity {
    return {
      id: domain.getId(),
      name: domain.getName(),
    };
  }

  static toEntities(domains: Role[]): PrismaRoleEntity[] {
    return domains.map((domain) => this.toEntity(domain));
  }
}
