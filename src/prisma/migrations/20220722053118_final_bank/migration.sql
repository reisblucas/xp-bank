/*
  Warnings:

  - You are about to drop the column `UsersLogin_id` on the `AccessHistory` table. All the data in the column will be lost.
  - You are about to drop the column `UsersLogin_id` on the `AccountsBalance` table. All the data in the column will be lost.
  - You are about to drop the column `UsersLogin_id` on the `AccountsStatement` table. All the data in the column will be lost.
  - You are about to alter the column `postal_code` on the `Addresses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `VarChar(9)`.
  - You are about to drop the column `UsersLogin_id` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `UsersLogin_id` on the `PersonalDatas` table. All the data in the column will be lost.
  - You are about to drop the column `UsersLogin_id` on the `Wallets` table. All the data in the column will be lost.
  - You are about to drop the `UsersLogin` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `Users_id` to the `AccessHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Users_id` to the `AccountsBalance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Users_id` to the `AccountsStatement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Users_id` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Users_id` to the `PersonalDatas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Users_id` to the `Wallets` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `accesshistory_userslogin_id_foreign` ON `AccessHistory`;

-- DropIndex
DROP INDEX `accountsbalance_userslogin_id_foreign` ON `AccountsBalance`;

-- DropIndex
DROP INDEX `accountsstatement_userslogin_id_foreign` ON `AccountsStatement`;

-- DropIndex
DROP INDEX `orders_userslogin_id_foreign` ON `Orders`;

-- DropIndex
DROP INDEX `personaldatas_userslogin_id_foreign` ON `PersonalDatas`;

-- DropIndex
DROP INDEX `wallets_userslogin_id_foreign` ON `Wallets`;

-- AlterTable
ALTER TABLE `AccessHistory` DROP COLUMN `UsersLogin_id`,
    ADD COLUMN `Users_id` INTEGER UNSIGNED NOT NULL;

-- AlterTable
ALTER TABLE `AccountsBalance` DROP COLUMN `UsersLogin_id`,
    ADD COLUMN `Users_id` INTEGER UNSIGNED NOT NULL;

-- AlterTable
ALTER TABLE `AccountsStatement` DROP COLUMN `UsersLogin_id`,
    ADD COLUMN `Users_id` INTEGER UNSIGNED NOT NULL;

-- AlterTable
ALTER TABLE `Addresses` MODIFY `postal_code` VARCHAR(9) NOT NULL;

-- AlterTable
ALTER TABLE `Orders` DROP COLUMN `UsersLogin_id`,
    ADD COLUMN `Users_id` INTEGER UNSIGNED NOT NULL;

-- AlterTable
ALTER TABLE `PersonalDatas` DROP COLUMN `UsersLogin_id`,
    ADD COLUMN `Users_id` INTEGER UNSIGNED NOT NULL;

-- AlterTable
ALTER TABLE `Wallets` DROP COLUMN `UsersLogin_id`,
    ADD COLUMN `Users_id` INTEGER UNSIGNED NOT NULL;

-- DropTable
DROP TABLE `UsersLogin`;

-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `salt` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `users_email_unique`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `accesshistory_users_id_foreign` ON `AccessHistory`(`Users_id`);

-- CreateIndex
CREATE INDEX `accountsbalance_users_id_foreign` ON `AccountsBalance`(`Users_id`);

-- CreateIndex
CREATE INDEX `accountsstatement_users_id_foreign` ON `AccountsStatement`(`Users_id`);

-- CreateIndex
CREATE INDEX `orders_users_id_foreign` ON `Orders`(`Users_id`);

-- CreateIndex
CREATE INDEX `personaldatas_users_id_foreign` ON `PersonalDatas`(`Users_id`);

-- CreateIndex
CREATE INDEX `wallets_users_id_foreign` ON `Wallets`(`Users_id`);
