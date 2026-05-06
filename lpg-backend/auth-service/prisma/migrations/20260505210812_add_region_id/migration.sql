/*
  Warnings:

  - You are about to drop the column `refreshToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `resetOtpExpires` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `resetPasswordOtp` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `verificationCode` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "refreshToken",
DROP COLUMN "resetOtpExpires",
DROP COLUMN "resetPasswordOtp",
DROP COLUMN "verificationCode",
ADD COLUMN     "otpCode" TEXT,
ADD COLUMN     "otpExpiresAt" TIMESTAMP(3),
ADD COLUMN     "regionId" TEXT;
