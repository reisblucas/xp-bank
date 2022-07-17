/*
  Warnings:

  - You are about to drop the column `address` on the `Addresses` table. All the data in the column will be lost.
  - You are about to alter the column `number` on the `Addresses` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - You are about to drop the column `name` on the `PersonalDatas` table. All the data in the column will be lost.
  - Added the required column `complement` to the `Addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postal_code` to the `Addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state_code` to the `Addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `PersonalDatas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Addresses` DROP COLUMN `address`,
    ADD COLUMN `complement` VARCHAR(50) NOT NULL,
    ADD COLUMN `postal_code` VARCHAR(20) NOT NULL,
    ADD COLUMN `state_code` VARCHAR(2) NOT NULL,
    MODIFY `logradouro` VARCHAR(50) NOT NULL,
    MODIFY `number` INTEGER UNSIGNED NOT NULL,
    MODIFY `country` VARCHAR(255) NOT NULL DEFAULT 'BR';

-- AlterTable
ALTER TABLE `PersonalDatas` DROP COLUMN `name`,
    ADD COLUMN `first_name` VARCHAR(50) NOT NULL;
