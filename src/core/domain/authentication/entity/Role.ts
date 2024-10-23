import { IsNumber, IsString } from 'class-validator';
import {
  CreateRoleEntityPayload,
  UpdateRoleEntityPayload,
} from '@core/domain/authentication/type/RoleType';

export class Role {
  @IsNumber()
  private id: number;

  @IsString()
  private name: string;

  // relation

  constructor(params: CreateRoleEntityPayload) {
    if (!params) return;

    this.id = params.id;
    this.name = params.name;

    // relation
  }

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  public async edit(params: UpdateRoleEntityPayload): Promise<this> {
    Object.keys(params).forEach((key) => {
      const keyProp = key;

      if (params[keyProp] !== undefined) {
        this[keyProp] = params[keyProp] as never;
      }
    });

    return this;
  }

  public async new(params: CreateRoleEntityPayload): Promise<Role> {
    const entity = new Role(params);
    return entity;
  }
}
