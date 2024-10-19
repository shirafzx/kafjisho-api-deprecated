export type rolePermissionParams = {
  id: number;
  roleId: number;
  permissionId: number;

  // relation
};

export type CreateRolePermissionEntityPayload = rolePermissionParams;

export type UpdateRolePermissionEntityPayload = Partial<
  Omit<CreateRolePermissionEntityPayload, 'id' | 'createdAt '>
>;
