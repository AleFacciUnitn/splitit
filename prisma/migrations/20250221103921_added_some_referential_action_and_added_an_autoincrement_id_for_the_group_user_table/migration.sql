/*
  Warnings:

  - The primary key for the `ExpenseGroupUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `ExpenseGroupUser` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Expense` DROP FOREIGN KEY `Expense_userId_fkey`;

-- DropForeignKey
ALTER TABLE `ExpenseGroupUser` DROP FOREIGN KEY `ExpenseGroupUser_groupId_fkey`;

-- DropForeignKey
ALTER TABLE `ExpenseGroupUser` DROP FOREIGN KEY `ExpenseGroupUser_userId_fkey`;

-- DropForeignKey
ALTER TABLE `PartitionExpense` DROP FOREIGN KEY `PartitionExpense_expenseId_fkey`;

-- DropIndex
DROP INDEX `ExpenseGroupUser_groupId_fkey` ON `ExpenseGroupUser`;

-- DropIndex
DROP INDEX `PartitionExpense_expenseId_fkey` ON `PartitionExpense`;

-- AlterTable
ALTER TABLE `Expense` MODIFY `userId` VARCHAR(30) NULL;

-- AlterTable
ALTER TABLE `ExpenseGroupUser` DROP PRIMARY KEY,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `userId` VARCHAR(30) NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `ExpenseGroupUser` ADD CONSTRAINT `ExpenseGroupUser_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `ExpenseGroup`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExpenseGroupUser` ADD CONSTRAINT `ExpenseGroupUser_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Expense` ADD CONSTRAINT `Expense_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PartitionExpense` ADD CONSTRAINT `PartitionExpense_expenseId_fkey` FOREIGN KEY (`expenseId`) REFERENCES `Expense`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
