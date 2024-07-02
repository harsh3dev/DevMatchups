/*
  Warnings:

  - Made the column `teamName` on table `Hackathon` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Hackathon" ALTER COLUMN "teamName" SET NOT NULL;
