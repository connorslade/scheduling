-- DropIndex
DROP INDEX "EventSession_slug_key";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "admin_user_id" TEXT[];
