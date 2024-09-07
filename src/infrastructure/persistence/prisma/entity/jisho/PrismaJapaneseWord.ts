import { japanese_words } from '@prisma/client';
import { PrismaJpThMeaningEntity } from 'src/infrastructure/persistence/prisma/entity/jisho/PrismaJpThMeaning';

export type PrismaJapaneseWordEntity = japanese_words;

export type PrismaJapaneseWordEntityIncluded = {
  jp_th_meanings?: PrismaJpThMeaningEntity[];
};
