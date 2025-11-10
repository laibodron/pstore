-- CreateEnum
CREATE TYPE "UserPermission" AS ENUM ('ALL', 'EDIT_PRODUCT');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "permissions" "UserPermission"[];
