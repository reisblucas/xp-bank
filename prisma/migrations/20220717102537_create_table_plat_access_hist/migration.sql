/*
  Warnings:

  - You are about to drop the column `Orders_id` on the `AccountsStatement` table. All the data in the column will be lost.
  - You are about to alter the column `logradouro` on the `Addresses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(20)`.
  - You are about to drop the column `Address_id` on the `PersonalDatas` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `PersonalDatas` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(50)`.
  - You are about to alter the column `last_name` on the `PersonalDatas` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(50)`.
  - You are about to alter the column `symbol` on the `Stocks` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(4)`.
  - You are about to alter the column `name` on the `Stocks` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(50)`.
  - You are about to alter the column `ticker` on the `Tickers` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(7)`.
  - You are about to drop the column `Stocks_symbol` on the `Transactions` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Transactions` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `Wallets` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(50)`.
  - Added the required column `OperationTypes_id` to the `AccountsStatement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UsersLogin_id` to the `AccountsStatement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PersonalDatas_id` to the `Addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UsersLogin_id` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Genders_id` to the `PersonalDatas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birth_date` to the `PersonalDatas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `OperationTypes_id` to the `Transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Stocks_ticker` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `accountsstatement_orders_id_foreign` ON `AccountsStatement`;

-- DropIndex
DROP INDEX `personaldatas_address_id_foreign` ON `PersonalDatas`;

-- AlterTable
ALTER TABLE `AccountsStatement` DROP COLUMN `Orders_id`,
    ADD COLUMN `OperationTypes_id` INTEGER UNSIGNED NOT NULL,
    ADD COLUMN `UsersLogin_id` INTEGER UNSIGNED NOT NULL;

-- AlterTable
ALTER TABLE `Addresses` ADD COLUMN `PersonalDatas_id` INTEGER UNSIGNED NOT NULL,
    MODIFY `logradouro` VARCHAR(20) NOT NULL;

-- AlterTable
ALTER TABLE `Orders` ADD COLUMN `UsersLogin_id` INTEGER UNSIGNED NOT NULL,
    ALTER COLUMN `sale_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `PersonalDatas` DROP COLUMN `Address_id`,
    ADD COLUMN `Genders_id` INTEGER UNSIGNED NOT NULL,
    ADD COLUMN `birth_date` DATETIME(0) NOT NULL,
    MODIFY `name` VARCHAR(50) NOT NULL,
    MODIFY `last_name` VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE `Stocks` MODIFY `symbol` VARCHAR(4) NOT NULL,
    MODIFY `name` VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE `Tickers` MODIFY `ticker` VARCHAR(7) NOT NULL;

-- AlterTable
ALTER TABLE `Transactions` DROP COLUMN `Stocks_symbol`,
    DROP COLUMN `type`,
    ADD COLUMN `OperationTypes_id` INTEGER UNSIGNED NOT NULL,
    ADD COLUMN `Stocks_ticker` VARCHAR(7) NOT NULL;

-- AlterTable
ALTER TABLE `Wallets` MODIFY `name` VARCHAR(50) NOT NULL;

-- CreateTable
CREATE TABLE `Genders` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OperationTypes` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `operationtypes_name_unique`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AccessHistory` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `UsersLogin_id` INTEGER UNSIGNED NOT NULL,
    `Platform_id` INTEGER UNSIGNED NOT NULL,
    `last_access` DATE NOT NULL,

    INDEX `accesshistory_userslogin_id_foreign`(`UsersLogin_id`),
    INDEX `access_platform_id_foreign`(`Platform_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Platform` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `platform_name_unique`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `accountsstatement_operationtypes_id_foreign` ON `AccountsStatement`(`OperationTypes_id`);

-- CreateIndex
CREATE INDEX `accountsstatement_userslogin_id_foreign` ON `AccountsStatement`(`UsersLogin_id`);

-- CreateIndex
CREATE INDEX `addresses_personaldatas_id_foreign` ON `Addresses`(`PersonalDatas_id`);

-- CreateIndex
CREATE INDEX `orders_userslogin_id_foreign` ON `Orders`(`UsersLogin_id`);

-- CreateIndex
CREATE INDEX `personaldatas_genders_id_foreign` ON `PersonalDatas`(`Genders_id`);

-- CreateIndex
CREATE INDEX `transactions_operationtypes_id_foreign` ON `Transactions`(`OperationTypes_id`);
