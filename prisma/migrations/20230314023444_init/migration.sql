-- CreateTable
CREATE TABLE `ProductSatisfaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_id` INTEGER NOT NULL,
    `satisfaction_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProductSatisfaction` ADD CONSTRAINT `ProductSatisfaction_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductSatisfaction` ADD CONSTRAINT `ProductSatisfaction_satisfaction_id_fkey` FOREIGN KEY (`satisfaction_id`) REFERENCES `Satisfaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
