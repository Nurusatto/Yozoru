/*
  Warnings:

  - Made the column `UID` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "UID" SET NOT NULL;
