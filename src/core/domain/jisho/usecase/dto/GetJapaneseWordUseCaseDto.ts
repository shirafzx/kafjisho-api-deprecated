import { Exclude, Expose, plainToClass } from 'class-transformer';

@Exclude()
export class GetJapaneseWordUseCaseDto {
  @Expose()
  id: number;

  @Expose()
  word: string;

  @Expose()
  furigana: string;

  public static newFromEntity(japaneseWord) {
    const dto: GetJapaneseWordUseCaseDto = plainToClass(
      GetJapaneseWordUseCaseDto,
      japaneseWord,
    );
    return dto;
  }

  public static newListFromEntity(japaneseWords) {
    return japaneseWords.map((japaneseWord) =>
      this.newFromEntity(japaneseWord),
    );
  }
}
