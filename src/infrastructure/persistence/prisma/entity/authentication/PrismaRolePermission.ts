import { role_permissions } from '@prisma/client';
import { PrismaPermissionEntity } from 'src/infrastructure/persistence/prisma/entity/authentication/PrismaPermission';

export type PrismaRolePermissionEntity = role_permissions;

export type PrismaRolePermissionIncluded = {
  permissions: PrismaPermissionEntity;
};
