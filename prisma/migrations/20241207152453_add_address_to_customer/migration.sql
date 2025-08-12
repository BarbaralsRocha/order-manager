/*
  Warnings:

  - A unique constraint covering the columns `[cnpj]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cnpj` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stateRegistration` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Customer` ADD COLUMN `address` VARCHAR(255) NOT NULL,
    ADD COLUMN `cnpj` VARCHAR(18) NOT NULL,
    ADD COLUMN `stateRegistration` VARCHAR(20) NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX `Customer_cnpj_key` ON `Customer`(`cnpj`);
