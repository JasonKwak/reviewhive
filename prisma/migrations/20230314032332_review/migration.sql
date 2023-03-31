/*
  Warnings:

  - You are about to drop the column `manufacturer` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `satisfaction_id` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `ProductSatisfaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Satisfaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_satisfaction_id_fkey`;

-- DropForeignKey
ALTER TABLE `ProductSatisfaction` DROP FOREIGN KEY `ProductSatisfaction_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `ProductSatisfaction` DROP FOREIGN KEY `ProductSatisfaction_satisfaction_id_fkey`;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `manufacturer`,
    DROP COLUMN `satisfaction_id`;

-- DropTable
DROP TABLE `ProductSatisfaction`;

-- DropTable
DROP TABLE `Satisfaction`;

-- CreateTable
CREATE TABLE `reviews` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,
    `satisfaction` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
