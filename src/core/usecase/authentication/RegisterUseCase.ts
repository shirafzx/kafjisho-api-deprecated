import { User } from '@core/domain/authentication/entity/User';
import { UserRepositoryPort } from '@core/domain/authentication/port/persistence/UserRepositoryPort';
import {
  IRegisterUseCase,
  RegisterUseCasePayload,
} from '@core/domain/authentication/usecase/RegisterUseCase';
import { RegisterUseCaseDto } from '@core/domain/authentication/usecase/dto/RegisterUseCaseDto';
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
