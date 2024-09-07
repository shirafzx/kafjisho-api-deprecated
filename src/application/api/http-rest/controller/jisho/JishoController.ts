import { GetJapaneseWordsQueryDto } from '@application/api/http-rest/validation-pipe/jisho/GetJapaneseWordsQuery';
import { PaginationQueryDto } from '@common/dto/PaginationQueryDto';
import { PaginationTransformPipe } from '@common/pipes/PaginationValidationPipe';
import { JishoDiToken } from '@core/domain/jisho/di/JishoDiToken';
import {
  GetJapaneseWordsUseCasePayload,
  IGetJapaneseWordsUseCase,
} from '@core/domain/jisho/usecase/GetJapaneseWordsUseCase';
import { Controller, Get, Inject, Query, ValidationPipe } from '@nestjs/common';

@Controller('/jisho')
export class JishoController {
  constructor(
    @Inject(JishoDiToken.GetJapaneseWordsUseCase)
    private readonly getJapaneseWordsUseCase: IGetJapaneseWordsUseCase,
  ) {}

  @Get('/search')
  async getJapaneseWords(
    @Query(new ValidationPipe({ transform: true }))
    query: GetJapaneseWordsQueryDto,
    @Query(new PaginationTransformPipe())
    pagination: PaginationQueryDto,
  ) {
    const { word } = query;
    const payload: GetJapaneseWordsUseCasePayload = {
      by: {
        word,
      },
      pagination,
    };

    const response = await this.getJapaneseWordsUseCase.execute(payload);
    return response;
  }
}
