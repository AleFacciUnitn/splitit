/*
  Warnings:

  - You are about to drop the column `groupId` on the `PartitionExpense` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `PartitionExpense` DROP FOREIGN KEY `PartitionExpense_groupId_fkey`;

-- DropIndex
DROP INDEX `PartitionExpense_groupId_fkey` ON `PartitionExpense`;

-- AlterTable
ALTER TABLE `PartitionExpense` DROP COLUMN `groupId`;
