import { JapaneseWordRepositoryPort } from '@core/domain/jisho/port/persistence/japaneseWordRepositoryPort';
import {
  GetJapaneseWordUseCasePayload,
  IGetJapaneseWordUseCase,
} from '@core/domain/jisho/usecase/GetJapaneseWordUseCase';
import { GetJapaneseWordUseCaseDto } from '@core/domain/jisho/usecase/dto/GetJapaneseWordUseCaseDto';

export class GetJapaneseWordUseCase implements IGetJapaneseWordUseCase {
  constructor(
    private readonly japaneseWordRepository: JapaneseWordRepositoryPort,
  ) {}

  async execute(
    params: GetJapaneseWordUseCasePayload,
  ): Promise<GetJapaneseWordUseCaseDto> {
    const { by } = params;
    const JapaneseWord = await this.japaneseWordRepository.findWord({
      where: {
        word: by.word,
      },
    });

    if (!JapaneseWord) {
      throw new Error('word not found');
    }
    return GetJapaneseWordUseCaseDto.newFromEntity(JapaneseWord);
  }
}
