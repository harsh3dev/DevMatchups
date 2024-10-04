/*
  Warnings:

  - A unique constraint covering the columns `[candidateId,postId]` on the table `Application` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Application_candidateId_postId_key" ON "Application"("candidateId", "postId");
