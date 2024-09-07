import { IsString } from 'class-validator';

export class GetJapaneseWordsQueryDto {
  @IsString()
  public readonly word: string;
}
