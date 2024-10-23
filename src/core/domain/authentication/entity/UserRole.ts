import { IsDate, IsNumber } from 'class-validator';
import {
  CreateUserRoleEntityPayload,
  UpdateUserRoleEntityPayload,
} from '@core/domain/authentication/type/UserRoleType';
import { Nullable } from '@common/types';
import { Role } from '@core/domain/authentication/entity/Role';

export class UserRole {
  @IsNumber()
  private id: number;

  @IsNumber()
  private userId: number;

  @IsNumber()
  private roleId: number;

  @IsDate()
  private assignedAt: Date;

  // relation
  private role: Nullable<Role>;

  constructor(params: CreateUserRoleEntityPayload) {
    if (!params) return;

    this.id = params.id;
    this.userId = params.userId;
    this.roleId = params.roleId;
    this.assignedAt = params.assignedAt;

    // relation
    this.role = params.role;
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

  getAssignedAt(): Date {
    return this.assignedAt;
  }

  getRole(): Role {
    return this.role;
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
