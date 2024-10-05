import { Prisma } from '@prisma/client';
import { JapaneseWord } from '@core/domain/jisho/entity/JapaneseWord';
import { PaginationParams } from '@common/type/PaginationType';

export type findJapaneseWordWhere = Prisma.japanese_wordsWhereInput;
export type findJapaneseWordWhereUnique = Prisma.japanese_wordsWhereUniqueInput;
export type findJapaneseWordInclude = Prisma.japanese_wordsInclude;
export type findJapaneseWordOrderBy =
  Prisma.japanese_wordsOrderByWithRelationInput;

export type FindJapaneseWordParams = {
  where: findJapaneseWordWhere;
  include?: findJapaneseWordInclude;
  orderBy?: findJapaneseWordOrderBy;
};

export type FindJapaneseWordsParams = {
  where: findJapaneseWordWhere;
  include?: findJapaneseWordInclude;
  orderBy?: findJapaneseWordOrderBy;
  pagination?: PaginationParams;
};

export type CountWordParams = {
  where?: findJapaneseWordWhere;
};

export interface JapaneseWordRepositoryPort {
  findWord(params: FindJapaneseWordParams): Promise<JapaneseWord>;
  findWords(params: FindJapaneseWordsParams): Promise<JapaneseWord[]>;
  countWords(params: CountWordParams): Promise<number>;
}
