/*
  Warnings:

  - You are about to drop the column `tmbdMovieId` on the `WatchlistItem` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,tmdbMovieId]` on the table `WatchlistItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tmdbMovieId` to the `WatchlistItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "WatchlistItem_userId_tmbdMovieId_key";

-- AlterTable
ALTER TABLE "WatchlistItem" DROP COLUMN "tmbdMovieId",
ADD COLUMN     "tmdbMovieId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "WatchlistItem_userId_tmdbMovieId_key" ON "WatchlistItem"("userId", "tmdbMovieId");
