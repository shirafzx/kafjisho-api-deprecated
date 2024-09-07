import { JapaneseWord } from '@core/domain/jisho/entity/JapaneseWord';
import { Exclude, Expose, plainToClass } from 'class-transformer';

@Exclude()
export class GetJapaneseWordsUseCaseDto {
  @Expose()
  id: number;

  @Expose()
  word: string;

  @Expose()
  furigana: string;

  meaning: {
    thai: string[];
  };

  public static newFromEntity(japaneseWord: JapaneseWord) {
    const dto: GetJapaneseWordsUseCaseDto = plainToClass(
      GetJapaneseWordsUseCaseDto,
      japaneseWord,
    );

    dto.meaning = {
      thai: japaneseWord.getThaiMeaning(),
    };
    return dto;
  }

  public static newListFromEntity(japaneseWords: JapaneseWord[]) {
    return japaneseWords.map((japaneseWord) =>
      this.newFromEntity(japaneseWord),
    );
  }
}
