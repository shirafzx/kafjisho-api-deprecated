export type userRoleParams = {
  id: number;
  userId: number;
  roleId: number;

  // relation
};

export type CreateUserRoleEntityPayload = userRoleParams;

export type UpdateUserRoleEntityPayload = Partial<
  Omit<CreateUserRoleEntityPayload, 'id' | 'createdAt '>
>;
