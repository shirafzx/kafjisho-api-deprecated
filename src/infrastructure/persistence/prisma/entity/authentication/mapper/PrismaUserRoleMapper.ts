import { UserRole } from '@core/domain/authentication/entity/UserRole';
import { PrismaRoleMapper } from 'src/infrastructure/persistence/prisma/entity/authentication/mapper/PrismaRoleMapper';
import {
  PrismaUserRoleEntity,
  PrismaUserRoleEntityIncluded,
} from 'src/infrastructure/persistence/prisma/entity/authentication/PrismaUserRole';

export class PrismaUserRoleMapper {
  static toDomain(
    entity: PrismaUserRoleEntity & PrismaUserRoleEntityIncluded,
  ): UserRole {
    const role = entity.role ? PrismaRoleMapper.toDomain(entity.role) : null;

    return new UserRole({
      id: entity.id,
      userId: entity.user_id,
      roleId: entity.role_id,
      assignedAt: entity.assigned_at,
      role,
    });
  }

  static toDomains(
    entities: (PrismaUserRoleEntity & PrismaUserRoleEntityIncluded)[],
  ): UserRole[] {
    return entities.map((entity) => this.toDomain(entity));
  }

  static toEntity(domain: UserRole): PrismaUserRoleEntity {
    return {
      id: domain.getId(),
      user_id: domain.getUserId(),
      role_id: domain.getRoleId(),
      assigned_at: domain.getAssignedAt(),
    };
  }

  static toEntities(domains: UserRole[]): PrismaUserRoleEntity[] {
    return domains.map((domain) => this.toEntity(domain));
  }
}
