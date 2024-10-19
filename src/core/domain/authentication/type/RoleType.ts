export type roleParams = {
  id: number;
  name: string;

  // relation
};

export type CreateRoleEntityPayload = roleParams;

export type UpdateRoleEntityPayload = Partial<
  Omit<CreateRoleEntityPayload, 'id' | 'createdAt '>
>;
