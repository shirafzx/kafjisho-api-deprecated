import { IsString } from 'class-validator';

export class RegisterBodyParams {
  @IsString()
  readonly username: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;
}
