-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `additionalInformation` VARCHAR(255) NULL,
    `type` ENUM('KG', 'UN', 'UN_KG') NOT NULL,
    `unityPrice` DECIMAL(10, 2) NOT NULL,
    `unitaryWeight` DECIMAL(10, 3) NOT NULL,
    `weightPrice` DECIMAL(10, 2) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
