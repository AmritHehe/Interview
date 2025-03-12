-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "Round1" DOUBLE PRECISION NOT NULL,
    "Round2" DOUBLE PRECISION NOT NULL,
    "Round3" DOUBLE PRECISION NOT NULL,
    "Technical" DOUBLE PRECISION,
    "TotalMarks" DOUBLE PRECISION,
    "Result" TEXT,
    "Rank" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
