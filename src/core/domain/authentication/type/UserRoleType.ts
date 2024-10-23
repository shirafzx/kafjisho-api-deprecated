import { Nullable } from '@common/types';
import { Role } from '@core/domain/authentication/entity/Role';

export type userRoleParams = {
  id: number;
  userId: number;
  roleId: number;
  assignedAt: Date;

  // relation
  role: Nullable<Role>;
};

export type CreateUserRoleEntityPayload = userRoleParams;

export type UpdateUserRoleEntityPayload = Partial<
  Omit<CreateUserRoleEntityPayload, 'id'>
>;
