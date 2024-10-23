import { IsNumber, IsString } from 'class-validator';
import {
  CreatePermissionEntityPayload,
  UpdatePermissionEntityPayload,
} from '@core/domain/authentication/type/PermissionType';

export class Permission {
  @IsNumber()
  private id: number;

  @IsString()
  private name: string;

  // relation

  constructor(params: CreatePermissionEntityPayload) {
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

  public async edit(params: UpdatePermissionEntityPayload): Promise<this> {
    Object.keys(params).forEach((key) => {
      const keyProp = key;

      if (params[keyProp] !== undefined) {
        this[keyProp] = params[keyProp] as never;
      }
    });

    return this;
  }

  public async new(params: CreatePermissionEntityPayload): Promise<Permission> {
    const entity = new Permission(params);
    return entity;
  }
}
