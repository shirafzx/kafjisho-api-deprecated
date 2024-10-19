import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { Nullable } from 'src/common/types';
import {
  CreateUserEntityPayload,
  UpdateUserEntityPayload,
} from '@core/domain/authentication/type/UserType';

export class User {
  @IsNumber()
  private id: number;

  @IsString()
  private username: string;

  @IsString()
  private email: string;

  @IsString()
  @IsOptional()
  private displayName: Nullable<string>;

  @IsString()
  @IsOptional()
  private avatar: Nullable<string>;

  @IsString()
  @IsOptional()
  private bio: Nullable<string>;

  @IsString()
  private encryptPassword: string;

  @IsDate()
  @IsOptional()
  private createdAt?: Nullable<Date>;

  @IsDate()
  @IsOptional()
  private updatedAt?: Nullable<Date>;

  // relation

  constructor(params: CreateUserEntityPayload) {
    if (!params) return;

    const currentDate = new Date();

    this.id = params.id;
    this.username = params.username;
    this.email = params.email;
    this.displayName = params.displayName;
    this.avatar = params.avatar;
    this.bio = params.bio;
    this.encryptPassword = params.encryptPassword;
    this.createdAt = params.createdAt || currentDate;
    this.updatedAt = params.updatedAt || currentDate;

    // relation
  }

  getId(): number {
    return this.id;
  }

  getUsername(): string {
    return this.username;
  }

  getEmail(): string {
    return this.email;
  }

  getDisplayName(): string {
    return this.displayName;
  }

  getAvatar(): string {
    return this.avatar;
  }

  getBio(): string {
    return this.bio;
  }

  getEncryptPassword(): string {
    return this.encryptPassword;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public async edit(params: UpdateUserEntityPayload): Promise<this> {
    const currentDate = new Date();

    Object.keys(params).forEach((key) => {
      const keyProp = key;

      if (params[keyProp] !== undefined) {
        this[keyProp] = params[keyProp] as never;
        this.updatedAt = currentDate;
      }
    });

    return this;
  }

  public async new(params: CreateUserEntityPayload): Promise<User> {
    const entity = new User(params);
    return entity;
  }
}
