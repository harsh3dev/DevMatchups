-- DropIndex
DROP INDEX "User_password_key";

-- CreateTable
CREATE TABLE "Hackathon" (
    "id" SERIAL NOT NULL,
    "hackathonName" TEXT NOT NULL,
    "regURL" TEXT NOT NULL,
    "hackathonMode" TEXT NOT NULL,
    "memberCount" INTEGER NOT NULL,
    "skills" TEXT[],
    "role" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "regDate" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "Employerid" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hackathon_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Hackathon" ADD CONSTRAINT "Hackathon_Employerid_fkey" FOREIGN KEY ("Employerid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
