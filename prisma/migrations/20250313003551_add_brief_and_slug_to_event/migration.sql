/*
  Warnings:

  - Added the required column `brief` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "brief" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL;
