-- AlterTable
ALTER TABLE `AccessHistory` MODIFY `last_access` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `AccountsBalance` MODIFY `balance` DOUBLE NOT NULL DEFAULT 0;
