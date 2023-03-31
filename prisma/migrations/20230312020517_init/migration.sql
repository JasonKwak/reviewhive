-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `brand` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `material` VARCHAR(191) NOT NULL,
    `manufacturer` VARCHAR(191) NOT NULL,
    `satisfaction_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Satisfaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Grade` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_satisfaction_id_fkey` FOREIGN KEY (`satisfaction_id`) REFERENCES `Satisfaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
