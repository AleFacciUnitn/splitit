/*
  Warnings:

  - The primary key for the `Account` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(30)`.
  - You are about to alter the column `userId` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(30)`.
  - The primary key for the `Authenticator` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `userId` on the `Authenticator` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(30)`.
  - The primary key for the `Expense` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Expense` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(30)`.
  - You are about to alter the column `userId` on the `Expense` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(30)`.
  - You are about to alter the column `groupId` on the `Expense` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(30)`.
  - The primary key for the `ExpenseGroup` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `ExpenseGroup` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(30)`.
  - The primary key for the `ExpenseGroupUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `userId` on the `ExpenseGroupUser` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(30)`.
  - You are about to alter the column `groupId` on the `ExpenseGroupUser` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(30)`.
  - The primary key for the `PartitionExpense` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `PartitionExpense` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(30)`.
  - You are about to alter the column `expenseId` on the `PartitionExpense` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(30)`.
  - You are about to alter the column `userId` on the `PartitionExpense` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(30)`.
  - The primary key for the `Session` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Session` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(30)`.
  - You are about to alter the column `userId` on the `Session` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(30)`.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(30)`.

*/
-- DropForeignKey
ALTER TABLE `Account` DROP FOREIGN KEY `Account_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Authenticator` DROP FOREIGN KEY `Authenticator_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Expense` DROP FOREIGN KEY `Expense_groupId_fkey`;

-- DropForeignKey
ALTER TABLE `Expense` DROP FOREIGN KEY `Expense_userId_fkey`;

-- DropForeignKey
ALTER TABLE `ExpenseGroupUser` DROP FOREIGN KEY `ExpenseGroupUser_groupId_fkey`;

-- DropForeignKey
ALTER TABLE `ExpenseGroupUser` DROP FOREIGN KEY `ExpenseGroupUser_userId_fkey`;

-- DropForeignKey
ALTER TABLE `PartitionExpense` DROP FOREIGN KEY `PartitionExpense_expenseId_fkey`;

-- DropForeignKey
ALTER TABLE `PartitionExpense` DROP FOREIGN KEY `PartitionExpense_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Session` DROP FOREIGN KEY `Session_userId_fkey`;

-- DropIndex
DROP INDEX `Expense_groupId_fkey` ON `Expense`;

-- DropIndex
DROP INDEX `ExpenseGroupUser_groupId_fkey` ON `ExpenseGroupUser`;

-- DropIndex
DROP INDEX `PartitionExpense_expenseId_fkey` ON `PartitionExpense`;

-- DropIndex
DROP INDEX `PartitionExpense_userId_fkey` ON `PartitionExpense`;

-- AlterTable
ALTER TABLE `Account` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(30) NOT NULL,
    MODIFY `userId` VARCHAR(30) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Authenticator` DROP PRIMARY KEY,
    MODIFY `userId` VARCHAR(30) NOT NULL,
    ADD PRIMARY KEY (`userId`, `credentialID`);

-- AlterTable
ALTER TABLE `Expense` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(30) NOT NULL,
    MODIFY `userId` VARCHAR(30) NOT NULL,
    MODIFY `amount` FLOAT NOT NULL,
    MODIFY `groupId` VARCHAR(30) NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `ExpenseGroup` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(30) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `ExpenseGroupUser` DROP PRIMARY KEY,
    MODIFY `userId` VARCHAR(30) NOT NULL,
    MODIFY `groupId` VARCHAR(30) NOT NULL,
    ADD PRIMARY KEY (`userId`, `groupId`);

-- AlterTable
ALTER TABLE `PartitionExpense` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(30) NOT NULL,
    MODIFY `expenseId` VARCHAR(30) NOT NULL,
    MODIFY `userId` VARCHAR(30) NOT NULL,
    MODIFY `amount` FLOAT NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Session` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(30) NOT NULL,
    MODIFY `userId` VARCHAR(30) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(30) NOT NULL,
    MODIFY `email` VARCHAR(320) NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Authenticator` ADD CONSTRAINT `Authenticator_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExpenseGroupUser` ADD CONSTRAINT `ExpenseGroupUser_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `ExpenseGroup`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExpenseGroupUser` ADD CONSTRAINT `ExpenseGroupUser_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Expense` ADD CONSTRAINT `Expense_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `ExpenseGroup`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Expense` ADD CONSTRAINT `Expense_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PartitionExpense` ADD CONSTRAINT `PartitionExpense_expenseId_fkey` FOREIGN KEY (`expenseId`) REFERENCES `Expense`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PartitionExpense` ADD CONSTRAINT `PartitionExpense_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
