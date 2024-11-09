/*
  Warnings:

  - You are about to alter the column `username` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(15)`.
  - You are about to alter the column `email` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `display_name` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `bio` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.

*/
-- AlterTable
ALTER TABLE "jp_en_meanings" ADD COLUMN     "explanation" TEXT;

-- AlterTable
ALTER TABLE "jp_th_meanings" ADD COLUMN     "explanation" TEXT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "username" SET DATA TYPE VARCHAR(15),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "display_name" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "bio" SET DATA TYPE VARCHAR(200);

-- CreateTable
CREATE TABLE "kanji" (
    "id" SERIAL NOT NULL,
    "kanji" TEXT NOT NULL,
    "kunyomi" TEXT NOT NULL,
    "onyomi" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "kanji_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kanji_radicals" (
    "id" SERIAL NOT NULL,
    "kanji" TEXT NOT NULL,
    "onyomi" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "kanji_radicals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "word_kanji" (
    "id" SERIAL NOT NULL,
    "japanese_word_id" INTEGER NOT NULL,
    "kanji_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "word_kanji_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kanji_th_meanings" (
    "id" SERIAL NOT NULL,
    "kanji_id" INTEGER NOT NULL,
    "thai_word_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "kanji_th_meanings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kanji_with_radicals" (
    "id" SERIAL NOT NULL,
    "kanji_id" INTEGER NOT NULL,
    "kanji_radical_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "kanji_with_radicals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "radicals_th_meanings" (
    "id" SERIAL NOT NULL,
    "kanji_radicals_id" INTEGER NOT NULL,
    "thai_word_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "radicals_th_meanings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "kanji_kanji_key" ON "kanji"("kanji");

-- CreateIndex
CREATE UNIQUE INDEX "kanji_radicals_kanji_key" ON "kanji_radicals"("kanji");

-- CreateIndex
CREATE UNIQUE INDEX "word_kanji_japanese_word_id_kanji_id_key" ON "word_kanji"("japanese_word_id", "kanji_id");

-- CreateIndex
CREATE UNIQUE INDEX "kanji_th_meanings_kanji_id_thai_word_id_key" ON "kanji_th_meanings"("kanji_id", "thai_word_id");

-- CreateIndex
CREATE UNIQUE INDEX "kanji_with_radicals_kanji_id_kanji_radical_id_key" ON "kanji_with_radicals"("kanji_id", "kanji_radical_id");

-- CreateIndex
CREATE UNIQUE INDEX "radicals_th_meanings_kanji_radicals_id_thai_word_id_key" ON "radicals_th_meanings"("kanji_radicals_id", "thai_word_id");

-- AddForeignKey
ALTER TABLE "word_kanji" ADD CONSTRAINT "word_kanji_japanese_word_id_fkey" FOREIGN KEY ("japanese_word_id") REFERENCES "japanese_words"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "word_kanji" ADD CONSTRAINT "word_kanji_kanji_id_fkey" FOREIGN KEY ("kanji_id") REFERENCES "kanji"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kanji_th_meanings" ADD CONSTRAINT "kanji_th_meanings_kanji_id_fkey" FOREIGN KEY ("kanji_id") REFERENCES "kanji"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kanji_th_meanings" ADD CONSTRAINT "kanji_th_meanings_thai_word_id_fkey" FOREIGN KEY ("thai_word_id") REFERENCES "thai_words"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kanji_with_radicals" ADD CONSTRAINT "kanji_with_radicals_kanji_id_fkey" FOREIGN KEY ("kanji_id") REFERENCES "kanji"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kanji_with_radicals" ADD CONSTRAINT "kanji_with_radicals_kanji_radical_id_fkey" FOREIGN KEY ("kanji_radical_id") REFERENCES "kanji_radicals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "radicals_th_meanings" ADD CONSTRAINT "radicals_th_meanings_kanji_radicals_id_fkey" FOREIGN KEY ("kanji_radicals_id") REFERENCES "kanji_radicals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "radicals_th_meanings" ADD CONSTRAINT "radicals_th_meanings_thai_word_id_fkey" FOREIGN KEY ("thai_word_id") REFERENCES "thai_words"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
