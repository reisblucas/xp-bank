/*
  Warnings:

  - You are about to drop the column `closing_price` on the `FSExchangeOverview` table. All the data in the column will be lost.
  - You are about to drop the column `opening_price` on the `FSExchangeOverview` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `FSExchangeOverview` table. All the data in the column will be lost.
  - You are about to drop the `StocksFSExchangeOverview` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `Stocks_id` to the `FSExchangeOverview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastSell` to the `FSExchangeOverview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `var` to the `FSExchangeOverview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `varPercent` to the `FSExchangeOverview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `volume` to the `FSExchangeOverview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `economic_sector` to the `Stocks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `segment` to the `Stocks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `segment_b3` to the `Stocks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sub_sector` to the `Stocks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salt` to the `UsersLogin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `FSExchangeOverview` DROP COLUMN `closing_price`,
    DROP COLUMN `opening_price`,
    DROP COLUMN `quantity`,
    ADD COLUMN `Stocks_id` INTEGER UNSIGNED NOT NULL,
    ADD COLUMN `lastSell` INTEGER UNSIGNED NOT NULL,
    ADD COLUMN `var` VARCHAR(255) NOT NULL,
    ADD COLUMN `varPercent` VARCHAR(255) NOT NULL,
    ADD COLUMN `volume` INTEGER UNSIGNED NOT NULL,
    MODIFY `lot_min` INTEGER UNSIGNED NOT NULL DEFAULT 100,
    MODIFY `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Stocks` ADD COLUMN `cnpj` VARCHAR(255) NULL,
    ADD COLUMN `dash_cnpj` VARCHAR(255) NULL,
    ADD COLUMN `economic_sector` VARCHAR(255) NOT NULL,
    ADD COLUMN `segment` VARCHAR(255) NOT NULL,
    ADD COLUMN `segment_b3` VARCHAR(255) NOT NULL,
    ADD COLUMN `sub_sector` VARCHAR(255) NOT NULL,
    MODIFY `name` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `Tickers` MODIFY `ticker` VARCHAR(12) NOT NULL;

-- AlterTable
ALTER TABLE `Transactions` MODIFY `Stocks_ticker` VARCHAR(12) NOT NULL;

-- AlterTable
ALTER TABLE `UsersLogin` ADD COLUMN `salt` VARCHAR(255) NOT NULL;

-- DropTable
DROP TABLE `StocksFSExchangeOverview`;

-- CreateIndex
CREATE INDEX `stocks_id_foreign` ON `FSExchangeOverview`(`Stocks_id`);
