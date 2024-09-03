import { Nullable } from 'src/common/types';

export type japaneseWordParams = {
  id: number;
  word: string;
  furigana: string;
  createdAt: Nullable<Date>;
  updatedAt: Nullable<Date>;
  // relatiom
};

export type CreateJapaneseWordEntityPayload = japaneseWordParams;

export type UpdateJapaneseWordEntityPayload = Partial<
  Omit<CreateJapaneseWordEntityPayload, 'id' | 'createdAt '>
>;
