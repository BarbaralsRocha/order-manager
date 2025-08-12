/*
  Warnings:

  - Added the required column `fantasyName` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Customer` ADD COLUMN `fantasyName` VARCHAR(255) NOT NULL;
