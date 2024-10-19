import { IBaseUseCase } from '@common/interfaces/BaseUseCase';
import { RegisterUseCaseDto } from '@core/domain/authentication/usecase/dto/RegisterUseCaseDto';

export type RegisterUseCasePayload = {
  data: {
    email: string;
    username: string;
    password: string;
  };
};

export type IRegisterUseCase = IBaseUseCase<
  RegisterUseCasePayload,
  RegisterUseCaseDto
>;
