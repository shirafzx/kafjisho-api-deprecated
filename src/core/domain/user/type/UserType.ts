import { UserRole } from '@core/domain/authentication/entity/UserRole';
import { Nullable } from 'src/common/types';

export type userParams = {
  id?: number;
  username: string;
  email: string;
  displayName?: Nullable<string>;
  avatar?: Nullable<string>;
  bio?: Nullable<string>;
  encryptPassword: string;
  createdAt?: Nullable<Date>;
  updatedAt?: Nullable<Date>;

  // relation
  userRoles?: Nullable<UserRole[]>;
};

export type CreateUserEntityPayload = userParams;

export type UpdateUserEntityPayload = Partial<
  Omit<CreateUserEntityPayload, 'id' | 'createdAt '>
>;
