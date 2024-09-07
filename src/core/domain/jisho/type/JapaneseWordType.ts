import { JpThMeaning } from '@core/domain/jisho/entity/JpThMeaning';
import { Nullable } from 'src/common/types';

export type japaneseWordParams = {
  id: number;
  word: string;
  furigana: string;
  createdAt: Nullable<Date>;
  updatedAt: Nullable<Date>;

  // relation
  jpThMeanings?: Nullable<JpThMeaning[]>;
};

export type CreateJapaneseWordEntityPayload = japaneseWordParams;

export type UpdateJapaneseWordEntityPayload = Partial<
  Omit<CreateJapaneseWordEntityPayload, 'id' | 'createdAt '>
>;
