/*
  Warnings:

  - The values [ending] on the enum `New_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "New_status_new" AS ENUM ('pending', 'in_progress', 'completed');
ALTER TABLE "tasks_history" ALTER COLUMN "new_status" TYPE "New_status_new" USING ("new_status"::text::"New_status_new");
ALTER TYPE "New_status" RENAME TO "New_status_old";
ALTER TYPE "New_status_new" RENAME TO "New_status";
DROP TYPE "New_status_old";
COMMIT;
