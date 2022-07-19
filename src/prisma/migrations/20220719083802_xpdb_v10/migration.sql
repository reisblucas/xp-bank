/*
  Warnings:

  - You are about to drop the column `Stocks_id` on the `FSExchangeOverview` table. All the data in the column will be lost.
  - You are about to drop the column `var` on the `FSExchangeOverview` table. All the data in the column will be lost.
  - You are about to drop the column `varPercent` on the `FSExchangeOverview` table. All the data in the column will be lost.
  - You are about to drop the column `volume` on the `FSExchangeOverview` table. All the data in the column will be lost.
  - You are about to drop the column `Stocks_ticker` on the `Transactions` table. All the data in the column will be lost.
  - Added the required column `Tickers_id` to the `FSExchangeOverview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `var12m` to the `FSExchangeOverview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `varDay` to the `FSExchangeOverview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `varMon` to the `FSExchangeOverview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `varSem` to the `FSExchangeOverview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `varYear` to the `FSExchangeOverview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vol` to the `FSExchangeOverview` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `lastSell` on the `FSExchangeOverview` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `Ticker` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `fsexchangeoverview_date_unique` ON `FSExchangeOverview`;

-- DropIndex
DROP INDEX `stocks_id_foreign` ON `FSExchangeOverview`;

-- AlterTable
ALTER TABLE `AccountsBalance` MODIFY `balance` DECIMAL(10, 2) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `AccountsStatement` MODIFY `value` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `FSExchangeOverview` DROP COLUMN `Stocks_id`,
    DROP COLUMN `var`,
    DROP COLUMN `varPercent`,
    DROP COLUMN `volume`,
    ADD COLUMN `Tickers_id` INTEGER UNSIGNED NOT NULL,
    ADD COLUMN `var12m` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `varDay` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `varMon` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `varSem` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `varYear` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `vol` INTEGER UNSIGNED NOT NULL,
    MODIFY `max` DECIMAL(10, 2) NOT NULL,
    MODIFY `min` DECIMAL(10, 2) NOT NULL,
    MODIFY `date` VARCHAR(255) NOT NULL,
    DROP COLUMN `lastSell`,
    ADD COLUMN `lastSell` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `Transactions` DROP COLUMN `Stocks_ticker`,
    ADD COLUMN `Ticker` VARCHAR(255) NOT NULL,
    MODIFY `price` DECIMAL(10, 2) NOT NULL;

-- CreateIndex
CREATE INDEX `tickers_id_foreign` ON `FSExchangeOverview`(`Tickers_id`);

-- CreateIndex
CREATE INDEX `transactions_tickers_ticker_foreign` ON `Transactions`(`Ticker`);
