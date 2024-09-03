import { IsString } from 'class-validator';

export class GetJapaneseWordQueryDto {
  @IsString()
  public readonly word: string;
}
