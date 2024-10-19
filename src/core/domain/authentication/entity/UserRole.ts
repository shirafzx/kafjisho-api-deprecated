import { IsNumber } from 'class-validator';
import {
  CreateUserRoleEntityPayload,
  UpdateUserRoleEntityPayload,
} from '@core/domain/authentication/type/UserRoleType';

export class UserRole {
  @IsNumber()
  private id: number;

  @IsNumber()
  private userId: number;

  @IsNumber()
  private roleId: number;

  // relation

  constructor(params: CreateUserRoleEntityPayload) {
    if (!params) return;

    this.id = params.id;
    this.userId = params.userId;
    this.roleId = params.roleId;

    // relation
  }

  getId(): number {
    return this.id;
  }

  getUserId(): number {
    return this.userId;
  }

  getRoleId(): number {
    return this.roleId;
  }

  public async edit(params: UpdateUserRoleEntityPayload): Promise<this> {
    Object.keys(params).forEach((key) => {
      const keyProp = key;

      if (params[keyProp] !== undefined) {
        this[keyProp] = params[keyProp] as never;
      }
    });

    return this;
  }

  public async new(params: CreateUserRoleEntityPayload): Promise<UserRole> {
    const entity = new UserRole(params);
    return entity;
  }
}
