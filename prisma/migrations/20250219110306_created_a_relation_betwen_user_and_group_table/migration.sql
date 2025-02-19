-- CreateTable
CREATE TABLE `ExpenseGroupUser` (
    `userId` VARCHAR(191) NOT NULL,
    `groupId` VARCHAR(191) NOT NULL,

    INDEX `ExpenseGroupUser_userId_groupId_idx`(`userId`, `groupId`),
    PRIMARY KEY (`userId`, `groupId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ExpenseGroupUser` ADD CONSTRAINT `ExpenseGroupUser_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `ExpenseGroup`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExpenseGroupUser` ADD CONSTRAINT `ExpenseGroupUser_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
