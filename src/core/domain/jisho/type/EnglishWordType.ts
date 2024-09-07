import { Nullable } from 'src/common/types';

export type englishWordParams = {
  id: number;
  word: string;
  createdAt: Nullable<Date>;
  updatedAt: Nullable<Date>;

  // relation
};

export type CreateEnglishWordEntityPayload = englishWordParams;

export type UpdateEnglishWordEntityPayload = Partial<
  Omit<CreateEnglishWordEntityPayload, 'id' | 'createdAt '>
>;
