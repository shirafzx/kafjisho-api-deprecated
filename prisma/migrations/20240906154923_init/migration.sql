-- CreateTable
CREATE TABLE "japanese_words" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,
    "furigana" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "japanese_words_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "thai_words" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "thai_words_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "english_words" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "english_words_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jp_th_meanings" (
    "id" SERIAL NOT NULL,
    "japanese_word_id" INTEGER NOT NULL,
    "thai_word_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "jp_th_meanings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jp_en_meanings" (
    "id" SERIAL NOT NULL,
    "japanese_word_id" INTEGER NOT NULL,
    "english_word_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "jp_en_meanings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "japanese_words_word_key" ON "japanese_words"("word");

-- CreateIndex
CREATE UNIQUE INDEX "thai_words_word_key" ON "thai_words"("word");

-- CreateIndex
CREATE UNIQUE INDEX "english_words_word_key" ON "english_words"("word");

-- CreateIndex
CREATE UNIQUE INDEX "jp_th_meanings_japanese_word_id_thai_word_id_key" ON "jp_th_meanings"("japanese_word_id", "thai_word_id");

-- CreateIndex
CREATE UNIQUE INDEX "jp_en_meanings_japanese_word_id_english_word_id_key" ON "jp_en_meanings"("japanese_word_id", "english_word_id");

-- AddForeignKey
ALTER TABLE "jp_th_meanings" ADD CONSTRAINT "jp_th_meanings_japanese_word_id_fkey" FOREIGN KEY ("japanese_word_id") REFERENCES "japanese_words"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jp_th_meanings" ADD CONSTRAINT "jp_th_meanings_thai_word_id_fkey" FOREIGN KEY ("thai_word_id") REFERENCES "thai_words"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jp_en_meanings" ADD CONSTRAINT "jp_en_meanings_japanese_word_id_fkey" FOREIGN KEY ("japanese_word_id") REFERENCES "japanese_words"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jp_en_meanings" ADD CONSTRAINT "jp_en_meanings_english_word_id_fkey" FOREIGN KEY ("english_word_id") REFERENCES "english_words"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
