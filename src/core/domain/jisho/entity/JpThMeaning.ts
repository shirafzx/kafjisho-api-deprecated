import { IsDate, IsNumber, IsOptional } from 'class-validator';
import { Nullable } from 'src/common/types';
import { JapaneseWord } from '@core/domain/jisho/entity/JapaneseWord';
import { CreateJapaneseWordEntityPayload } from '@core/domain/jisho/type/JapaneseWordType';
import {
  CreateJpThMeaningEntityPayload,
  UpdateJpThMeaningdEntityPayload,
} from '@core/domain/jisho/type/JPTHMeaningType';
import { ThaiWord } from '@core/domain/jisho/entity/ThaiWord';

export class JpThMeaning {
  @IsNumber()
  private id: number;

  @IsNumber()
  private japaneseWordid: number;

  @IsNumber()
  private thaiWordid: number;

  @IsDate()
  @IsOptional()
  private createdAt?: Nullable<Date>;

  @IsDate()
  @IsOptional()
  private updatedAt?: Nullable<Date>;

  // relation
  private thaiWord?: Nullable<ThaiWord>;

  constructor(params: CreateJpThMeaningEntityPayload) {
    if (!params) return;

    const currentDate = new Date();

    this.id = params.id;
    this.japaneseWordid = params.japaneseWordId;
    this.thaiWordid = params.thaiWordId;
    this.createdAt = params.createdAt || currentDate;
    this.updatedAt = params.updatedAt || currentDate;

    // relation
    this.thaiWord = params.thaiWord;
  }

  getId(): number {
    return this.id;
  }

  getJapaneseWordid(): number {
    return this.japaneseWordid;
  }

  getThaiWordid(): number {
    return this.thaiWordid;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  getThaiWord(): ThaiWord {
    return this.thaiWord;
  }

  public async edit(params: UpdateJpThMeaningdEntityPayload): Promise<this> {
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
