import { jp_th_meanings } from '@prisma/client';
import { PrismaThaiWordEntity } from 'src/infrastructure/persistence/prisma/entity/jisho/PrismaThaiWord';

export type PrismaJpThMeaningEntity = jp_th_meanings;

export type PrismaJpThMeaningEntityIncluded = {
  thai_word?: PrismaThaiWordEntity;
};
