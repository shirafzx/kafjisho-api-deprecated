import { IBaseUseCase } from '@common/interfaces/BaseUseCase';
import { GetJapaneseWordUseCaseDto } from '@core/domain/jisho/usecase/dto/GetJapaneseWordUseCaseDto';

export type GetJapaneseWordUseCasePayload = {
  by: {
    word: string;
  };
};

export type IGetJapaneseWordUseCase = IBaseUseCase<
  GetJapaneseWordUseCasePayload,
  GetJapaneseWordUseCaseDto
>;
