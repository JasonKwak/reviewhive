-- DropForeignKey
ALTER TABLE `Review` DROP FOREIGN KEY `Review_productId_fkey`;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
