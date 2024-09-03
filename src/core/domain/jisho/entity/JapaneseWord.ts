import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { Nullable } from 'src/common/types';
import {
  CreateJapaneseWordEntityPayload,
  UpdateJapaneseWordEntityPayload,
} from '../type/JapaneseWordType';

export class JapaneseWord {
  @IsNumber()
  private id: number;

  @IsString()
  private word: string;

  @IsString()
  private furigana: string;

  @IsDate()
  @IsOptional()
  private createdAt?: Nullable<Date>;

  @IsDate()
  @IsOptional()
  private updatedAt?: Nullable<Date>;

  // relation

  constructor(params: CreateJapaneseWordEntityPayload) {
    if (!params) return;

    const currentDate = new Date();

    this.id = params.id;
    this.word = params.word;
    this.furigana = params.furigana;
    this.createdAt = params.createdAt || currentDate;
    this.updatedAt = params.updatedAt || currentDate;
  }

  getId(): number {
    return this.id;
  }

  getWord(): string {
    return this.word;
  }

  getFurigana(): string {
    return this.furigana;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public async edit(params: UpdateJapaneseWordEntityPayload): Promise<this> {
    const currentDate = new Date();

    Object.keys(params).forEach((key) => {
      const keyProp = key;

      if (params[keyProp] !== undefined) {
        this[keyProp] = params[keyProp] as never;
        this.updatedAt = currentDate;
      }
    });

    return this;
  }

  public async new(
    params: CreateJapaneseWordEntityPayload,
  ): Promise<JapaneseWord> {
    const entity = new JapaneseWord(params);
    return entity;
  }
}
