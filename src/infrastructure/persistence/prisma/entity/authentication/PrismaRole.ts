import { roles } from '@prisma/client';

import { PrismaRolePermissionEntity } from 'src/infrastructure/persistence/prisma/entity/authentication/PrismaRolePermission';

export type PrismaRoleEntity = roles;

export type PrismaRoleIncluded = {
  role_permissions: PrismaRolePermissionEntity;
};
