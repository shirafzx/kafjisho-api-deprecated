import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { Nullable } from 'src/common/types';
import { JapaneseWord } from '@core/domain/jisho/entity/JapaneseWord';
import {
  CreateThaiWordEntityPayload,
  UpdateThaiWordEntityPayload,
} from '@core/domain/jisho/type/ThaiWordType';
import { CreateJapaneseWordEntityPayload } from '@core/domain/jisho/type/JapaneseWordType';

export class ThaiWord {
  @IsNumber()
  private id: number;

  @IsString()
  private word: string;

  @IsDate()
  @IsOptional()
  private createdAt?: Nullable<Date>;

  @IsDate()
  @IsOptional()
  private updatedAt?: Nullable<Date>;

  // relation

  constructor(params: CreateThaiWordEntityPayload) {
    if (!params) return;

    const currentDate = new Date();

    this.id = params.id;
    this.word = params.word;
    this.createdAt = params.createdAt || currentDate;
    this.updatedAt = params.updatedAt || currentDate;
  }

  getId(): number {
    return this.id;
  }

  getWord(): string {
    return this.word;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public async edit(params: UpdateThaiWordEntityPayload): Promise<this> {
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
