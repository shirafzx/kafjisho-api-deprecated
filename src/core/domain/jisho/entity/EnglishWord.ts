import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { Nullable } from 'src/common/types';
import {
  CreateEnglishWordEntityPayload,
  UpdateEnglishWordEntityPayload,
} from '@core/domain/jisho/type/EnglishWordType';

export class EnglishWord {
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

  constructor(params: CreateEnglishWordEntityPayload) {
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

  public async edit(params: UpdateEnglishWordEntityPayload): Promise<this> {
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
    params: CreateEnglishWordEntityPayload,
  ): Promise<EnglishWord> {
    const entity = new EnglishWord(params);
    return entity;
  }
}
