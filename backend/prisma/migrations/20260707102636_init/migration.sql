-- CreateEnum
CREATE TYPE "Status" AS ENUM ('OPEN', 'RESOLVED', 'INVESTIGATING');

-- CreateTable
CREATE TABLE "Incident" (
    "id" SERIAL NOT NULL,
    "service" TEXT NOT NULL,
    "errorLog" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Incident_pkey" PRIMARY KEY ("id")
);
