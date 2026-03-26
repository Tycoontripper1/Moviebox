/*
  Warnings:

  - You are about to drop the column `movieId` on the `WatchlistItem` table. All the data in the column will be lost.
  - You are about to drop the `Movie` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,tmbdMovieId]` on the table `WatchlistItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `WatchlistItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tmbdMovieId` to the `WatchlistItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Movie" DROP CONSTRAINT "Movie_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "WatchlistItem" DROP CONSTRAINT "WatchlistItem_movieId_fkey";

-- DropIndex
DROP INDEX "WatchlistItem_userId_movieId_key";

-- AlterTable
ALTER TABLE "WatchlistItem" DROP COLUMN "movieId",
ADD COLUMN     "posterurl" TEXT,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "tmbdMovieId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Movie";

-- CreateIndex
CREATE UNIQUE INDEX "WatchlistItem_userId_tmbdMovieId_key" ON "WatchlistItem"("userId", "tmbdMovieId");
