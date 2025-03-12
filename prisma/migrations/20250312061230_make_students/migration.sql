/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "studentName" VARCHAR(30) NOT NULL,
    "collegeName" VARCHAR(50) NOT NULL,
    "round1Marks" DOUBLE PRECISION NOT NULL,
    "round2Marks" DOUBLE PRECISION NOT NULL,
    "round3Marks" DOUBLE PRECISION NOT NULL,
    "technicalRoundMarks" DOUBLE PRECISION NOT NULL,
    "totalMarks" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "result" TEXT NOT NULL DEFAULT 'Rejected',
    "rank" INTEGER,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);
