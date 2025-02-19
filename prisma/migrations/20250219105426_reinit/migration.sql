/*
  Warnings:

  - You are about to drop the `Group` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Expense` DROP FOREIGN KEY `Expense_groupId_fkey`;

-- DropForeignKey
ALTER TABLE `PartitionExpense` DROP FOREIGN KEY `PartitionExpense_groupId_fkey`;

-- DropIndex
DROP INDEX `Expense_groupId_fkey` ON `Expense`;

-- DropIndex
DROP INDEX `PartitionExpense_groupId_fkey` ON `PartitionExpense`;

-- DropTable
DROP TABLE `Group`;

-- CreateTable
CREATE TABLE `ExpenseGroup` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Expense` ADD CONSTRAINT `Expense_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `ExpenseGroup`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PartitionExpense` ADD CONSTRAINT `PartitionExpense_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `ExpenseGroup`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
