/*
  Warnings:

  - You are about to alter the column `order_executed` on the `Orders` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `UnsignedInt`.
  - You are about to drop the column `Ticker` on the `Transactions` table. All the data in the column will be lost.
  - Added the required column `Tickers_id` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `transactions_tickers_ticker_foreign` ON `Transactions`;

-- AlterTable
ALTER TABLE `Orders` MODIFY `order_executed` INTEGER UNSIGNED NULL DEFAULT 0,
    MODIFY `sale_at` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Transactions` DROP COLUMN `Ticker`,
    ADD COLUMN `Tickers_id` INTEGER UNSIGNED NOT NULL;

-- CreateIndex
CREATE INDEX `transactions_tickers_id_foreign` ON `Transactions`(`Tickers_id`);
