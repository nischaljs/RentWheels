/*
  Warnings:

  - You are about to drop the column `token` on the `Payment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[purchaseOrderId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `purchaseOrderId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Payment` DROP COLUMN `token`,
    ADD COLUMN `paymentUrl` VARCHAR(191) NULL,
    ADD COLUMN `pidx` VARCHAR(191) NULL,
    ADD COLUMN `purchaseOrderId` VARCHAR(191) NOT NULL,
    ADD COLUMN `transactionId` VARCHAR(191) NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Payment_purchaseOrderId_key` ON `Payment`(`purchaseOrderId`);

-- CreateIndex
CREATE INDEX `Payment_userId_fkey` ON `Payment`(`userId`);

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
