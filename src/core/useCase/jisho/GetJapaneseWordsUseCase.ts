import { PaginationDto } from '@common/dto/PaginationDto';
import {
  findJapaneseWordWhere,
  JapaneseWordRepositoryPort,
} from '@core/domain/jisho/port/persistence/JapaneseWordRepositoryPort';
import {
  GetJapaneseWordsUseCasePayload,
  IGetJapaneseWordsUseCase,
} from '@core/domain/jisho/useCase/GetJapaneseWordsUseCase';
import { GetJapaneseWordsUseCaseDto } from '@core/domain/jisho/useCase/dto/GetJapaneseWordsUseCaseDto';
import { HttpException, HttpStatus } from '@nestjs/common';

export class GetJapaneseWordsUseCase implements IGetJapaneseWordsUseCase {
  constructor(
    private readonly japaneseWordRepository: JapaneseWordRepositoryPort,
  ) {}

  async execute(
    params: GetJapaneseWordsUseCasePayload,
  ): Promise<PaginationDto<GetJapaneseWordsUseCaseDto>> {
    const { by, pagination } = params;

    const where: findJapaneseWordWhere = {
      OR: [
        {
          word: {
            contains: by.word,
          },
        },
        {
          furigana: {
            contains: by.word,
          },
        },
        {
          jp_th_meanings: {
            some: {
              thai_word: {
                word: {
                  contains: by.word,
                },
              },
            },
          },
        },
      ],
    };

    const [JapaneseWords, itemCount] = await Promise.all([
      this.japaneseWordRepository.findWords({
        where,
        pagination,
        include: {
          jp_th_meanings: {
            include: {
              thai_word: true,
            },
          },
        },
      }),
      this.japaneseWordRepository.countWords({ where }),
    ]);

    if (JapaneseWords.length === 0) {
      throw new HttpException('Word Not Found', HttpStatus.NOT_FOUND);
    }

    const dtos = GetJapaneseWordsUseCaseDto.newListFromEntity(JapaneseWords);
    return new PaginationDto({
      items: dtos,
      pagination,
      itemCount,
    });
  }
}
