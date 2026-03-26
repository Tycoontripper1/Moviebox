/*
  Warnings:

  - You are about to drop the column `tmdbMovieId` on the `WatchlistItem` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,movieId]` on the table `WatchlistItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `movieId` to the `WatchlistItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "WatchlistItem_userId_tmdbMovieId_key";

-- AlterTable
ALTER TABLE "WatchlistItem" DROP COLUMN "tmdbMovieId",
ADD COLUMN     "movieId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "WatchlistItem_userId_movieId_key" ON "WatchlistItem"("userId", "movieId");
