import { ThaiWord } from '@core/domain/jisho/entity/ThaiWord';
import { Nullable } from 'src/common/types';

export type JpThMeaningParams = {
  id: number;
  japaneseWordId: number;
  thaiWordId: number;
  createdAt: Nullable<Date>;
  updatedAt: Nullable<Date>;

  // relation
  thaiWord?: Nullable<ThaiWord>;
};

export type CreateJpThMeaningEntityPayload = JpThMeaningParams;

export type UpdateJpThMeaningdEntityPayload = Partial<
  Omit<CreateJpThMeaningEntityPayload, 'id' | 'createdAt '>
>;
