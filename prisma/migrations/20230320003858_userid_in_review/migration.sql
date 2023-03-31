/*
  Warnings:

  - Made the column `userId` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `userId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_userId_fkey`;

-- AlterTable
ALTER TABLE `Product` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Review` ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
