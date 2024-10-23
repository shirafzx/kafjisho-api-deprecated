export type permissionParams = {
  id: number;
  name: string;

  // relation
};

export type CreatePermissionEntityPayload = permissionParams;

export type UpdatePermissionEntityPayload = Partial<
  Omit<CreatePermissionEntityPayload, 'id' | 'createdAt '>
>;
