import { PaginationDto } from '@common/dto/PaginationDto';
import { PaginationQueryDto } from '@common/dto/PaginationQueryDto';
import { IBaseUseCase } from '@common/interfaces/BaseUseCase';
import { GetJapaneseWordsUseCaseDto } from '@core/domain/jisho/usecase/dto/GetJapaneseWordsUseCaseDto';

export type GetJapaneseWordsUseCasePayload = {
  by: {
    word: string;
  };
  pagination: PaginationQueryDto;
};

export type IGetJapaneseWordsUseCase = IBaseUseCase<
  GetJapaneseWordsUseCasePayload,
  PaginationDto<GetJapaneseWordsUseCaseDto>
>;
