import { GetJapaneseWordQueryDto } from '@application/api/http-rest/validation-pipe/jisho/GetJapaneseWordQuery';
import { JishoDiToken } from '@core/domain/jisho/di/JishoDiToken';
import {
  GetJapaneseWordUseCasePayload,
  IGetJapaneseWordUseCase,
} from '@core/domain/jisho/usecase/GetJapaneseWordUseCase';
import { Controller, Get, Inject, Query, ValidationPipe } from '@nestjs/common';

@Controller('/jisho')
export class JishoController {
  constructor(
    @Inject(JishoDiToken.GetJapaneseWordUseCase)
    private readonly getJapaneseWordUseCase: IGetJapaneseWordUseCase,
  ) {}

  @Get('/word')
  async getJapaneseWord(
    @Query(new ValidationPipe({ transform: true }))
    query: GetJapaneseWordQueryDto,
  ) {
    const { word } = query;
    const payload: GetJapaneseWordUseCasePayload = {
      by: {
        word,
      },
    };

    const response = await this.getJapaneseWordUseCase.execute(payload);
    return response;
  }
}
