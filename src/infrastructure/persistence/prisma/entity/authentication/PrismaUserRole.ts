import { user_roles } from '@prisma/client';
import { PrismaRoleEntity } from 'src/infrastructure/persistence/prisma/entity/authentication/PrismaRole';

export type PrismaUserRoleEntity = user_roles;

export type PrismaUserRoleEntityIncluded = {
  role?: PrismaRoleEntity;
};
