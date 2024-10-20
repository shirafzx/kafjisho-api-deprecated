import { Prisma } from '@prisma/client';
import { PaginationParams } from '@common/type/PaginationType';
import { User } from '@core/domain/user/entity/User';

export type findUserWhere = Prisma.usersWhereInput;
export type findUserWhereUnique = Prisma.usersWhereUniqueInput;
export type findUserInclude = Prisma.usersInclude;
export type findUserOrderBy = Prisma.usersOrderByWithRelationInput;

export type FindUserParams = {
  where: findUserWhere;
  include?: findUserInclude;
  orderBy?: findUserOrderBy;
};

export type FindUsersParams = {
  where: findUserWhere;
  include?: findUserInclude;
  orderBy?: findUserOrderBy;
  pagination?: PaginationParams;
};

export type CreateUserParams = {
  data: User;
  include?: findUserInclude;
};

export type UpdateUserParams = {
  data: User;
  where: findUserWhereUnique;
  include?: findUserInclude;
};

export type CountUserParams = {
  where?: findUserWhere;
};

export interface UserRepositoryPort {
  findUser(params: FindUserParams): Promise<User>;
  findUsers(params: FindUsersParams): Promise<User[]>;
  createUser(params: CreateUserParams): Promise<User>;
  updateUser(params: UpdateUserParams): Promise<User>;
  countUsers(params: CountUserParams): Promise<number>;
}
