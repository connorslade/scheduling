/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `EventSession` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `EventSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EventSession" ADD COLUMN     "slug" TEXT NOT NULL,
ALTER COLUMN "capacity" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Event_slug_key" ON "Event"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "EventSession_slug_key" ON "EventSession"("slug");
