import { IsNumber } from 'class-validator';
import {
  CreateRolePermissionEntityPayload,
  UpdateRolePermissionEntityPayload,
} from '@core/domain/authentication/type/RolePermissionType';

export class RolePermission {
  @IsNumber()
  private id: number;

  @IsNumber()
  private roleId: number;

  @IsNumber()
  private permissionId: number;

  // relation

  constructor(params: CreateRolePermissionEntityPayload) {
    if (!params) return;

    this.id = params.id;
    this.roleId = params.roleId;
    this.permissionId = params.permissionId;

    // relation
  }

  getId(): number {
    return this.id;
  }

  getRoleId(): number {
    return this.roleId;
  }

  getPermissionId(): number {
    return this.permissionId;
  }

  public async edit(params: UpdateRolePermissionEntityPayload): Promise<this> {
    Object.keys(params).forEach((key) => {
      const keyProp = key;

      if (params[keyProp] !== undefined) {
        this[keyProp] = params[keyProp] as never;
      }
    });

    return this;
  }

  public async new(
    params: CreateRolePermissionEntityPayload,
  ): Promise<RolePermission> {
    const entity = new RolePermission(params);
    return entity;
  }
}
