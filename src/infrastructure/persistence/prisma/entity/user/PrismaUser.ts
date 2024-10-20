import { users } from '@prisma/client';
import { PrismaUserRoleEntity } from 'src/infrastructure/persistence/prisma/entity/authentication/PrismaUserRole';

export type PrismaUserEntity = users;

export type PrismaUserEntityIncluded = {
  user_roles?: PrismaUserRoleEntity[];
};
