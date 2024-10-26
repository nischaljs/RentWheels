/*
  Warnings:

  - Added the required column `recurring` to the `AvailabilitySlot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `AvailabilitySlot` ADD COLUMN `recurring` BOOLEAN NOT NULL,
    ADD COLUMN `specificDate` DATETIME(3) NULL,
    MODIFY `dayOfWeek` VARCHAR(191) NULL;
