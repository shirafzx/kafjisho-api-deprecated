import { Nullable } from 'src/common/types';

export type thaiWordParams = {
  id: number;
  word: string;
  createdAt: Nullable<Date>;
  updatedAt: Nullable<Date>;

  // relation
};

export type CreateThaiWordEntityPayload = thaiWordParams;

export type UpdateThaiWordEntityPayload = Partial<
  Omit<CreateThaiWordEntityPayload, 'id' | 'createdAt '>
>;
