import { User } from '@core/domain/user/entity/User';
import { UserRepositoryPort } from '@core/domain/user/port/persistence/UserRepositoryPort';
import {
  IRegisterUseCase,
  RegisterUseCasePayload,
} from '@core/domain/authentication/useCase/RegisterUseCase';
import { RegisterUseCaseDto } from '@core/domain/authentication/useCase/dto/RegisterUseCaseDto';
import * as bcrypt from 'bcrypt';

export class RegisterUseCase implements IRegisterUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(params: RegisterUseCasePayload): Promise<RegisterUseCaseDto> {
    const { data } = params;
    const encryptPassword = await bcrypt.hash(data.password, 10);

    const userEntity = new User({
      email: data.email,
      username: data.username,
      encryptPassword: encryptPassword,
    });

    const user = await this.userRepository.createUser({
      data: userEntity,
    });

    return RegisterUseCaseDto.newFromEntity(user);
  }
}
