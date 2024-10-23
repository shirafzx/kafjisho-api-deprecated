import { User } from '@core/domain/user/entity/User';
import { Exclude, Expose, plainToClass } from 'class-transformer';

@Exclude()
export class RegisterUseCaseDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  username: string;

  public static newFromEntity(user: User) {
    const dto: RegisterUseCaseDto = plainToClass(RegisterUseCaseDto, user);

    return dto;
  }

  public static newListFromEntity(users: User[]) {
    return users.map((user) => this.newFromEntity(user));
  }
}
