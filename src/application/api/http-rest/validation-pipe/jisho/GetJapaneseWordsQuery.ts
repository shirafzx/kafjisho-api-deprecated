import { IsNotEmpty, IsString } from 'class-validator';

export class GetJapaneseWordsQueryDto {
  @IsNotEmpty()
  @IsString()
  public readonly word: string;
}
