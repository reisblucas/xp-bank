CREATE TABLE `FSExchangeOverview`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Tickers_id` INT UNSIGNED NOT NULL,
    `date` DATETIME NOT NULL,
    `lastSell` INT UNSIGNED NOT NULL,
    `varDay` INT UNSIGNED NOT NULL,
    `varSem` INT UNSIGNED NOT NULL,
    `varMon` INT UNSIGNED NOT NULL,
    `varYear` INT UNSIGNED NOT NULL,
    `var12m` INT UNSIGNED NOT NULL,
    `max` DOUBLE NOT NULL,
    `min` DOUBLE NOT NULL,
    `vol` INT UNSIGNED NOT NULL,
    `lot_min` INT UNSIGNED NOT NULL
);
CREATE TABLE `Stocks`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `symbol` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `economic_sector` VARCHAR(255) NOT NULL,
    `sub_sector` VARCHAR(255) NOT NULL,
    `segment` VARCHAR(255) NOT NULL,
    `segment_b3` VARCHAR(255) NOT NULL,
    `cnpj` VARCHAR(255) NOT NULL,
    `dash_cnpj` VARCHAR(255) NOT NULL
);
ALTER TABLE
    `Stocks` ADD UNIQUE `stocks_symbol_unique`(`symbol`);
CREATE TABLE `Orders`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Users_id` INT UNSIGNED NOT NULL,
    `Transactions_id` INT UNSIGNED NOT NULL,
    `order_executed` TINYINT(1) NOT NULL,
    `created_at` TIMESTAMP NOT NULL,
    `sale_at` TIMESTAMP NOT NULL
);
CREATE TABLE `Transactions`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Wallets_id` INT UNSIGNED NOT NULL,
    `Tickers_id` INT UNSIGNED NOT NULL,
    `quantity` INT UNSIGNED NOT NULL,
    `price` DOUBLE NOT NULL,
    `OperationTypes_id` INT UNSIGNED NOT NULL,
    `created_at` TIMESTAMP NOT NULL
);
CREATE TABLE `Wallets`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `UsersLogin_id` INT UNSIGNED NOT NULL,
    `created_at` TIMESTAMP NOT NULL,
    `updated_at` TIMESTAMP NOT NULL
);
CREATE TABLE `AccountsStatement`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `value` DOUBLE NOT NULL,
    `Users_id` INT UNSIGNED NOT NULL,
    `OperationTypes_id` INT UNSIGNED NOT NULL,
    `created_at` TIMESTAMP NOT NULL
);
CREATE TABLE `AccountsBalance`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Users_id` INT UNSIGNED NOT NULL,
    `balance` DOUBLE NOT NULL,
    `updated_at` TIMESTAMP NOT NULL
);
CREATE TABLE `Tickers`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `ticker` VARCHAR(255) NOT NULL,
    `Stocks_id` INT UNSIGNED NOT NULL
);
ALTER TABLE
    `Tickers` ADD UNIQUE `tickers_ticker_unique`(`ticker`);
CREATE TABLE `Addresses`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `PersonalDatas_id` INT UNSIGNED NOT NULL,
    `postal_code` VARCHAR(255) NOT NULL,
    `logradouro` VARCHAR(255) NOT NULL,
    `complement` VARCHAR(255) NOT NULL,
    `number` INT NOT NULL,
    `city` VARCHAR(255) NOT NULL,
    `district` VARCHAR(255) NOT NULL,
    `state` VARCHAR(255) NOT NULL,
    `state_code` VARCHAR(255) NOT NULL,
    `country` VARCHAR(255) NOT NULL,
    `updated_at` TIMESTAMP NOT NULL
);
CREATE TABLE `PersonalDatas`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `cpf` INT UNSIGNED NOT NULL,
    `rg` INT UNSIGNED NOT NULL,
    `birth_date` DATETIME NOT NULL,
    `Genders_id` INT UNSIGNED NOT NULL,
    `Users_id` INT UNSIGNED NOT NULL,
    `updated_at` TIMESTAMP NOT NULL
);
ALTER TABLE
    `PersonalDatas` ADD UNIQUE `personaldatas_cpf_unique`(`cpf`);
ALTER TABLE
    `PersonalDatas` ADD UNIQUE `personaldatas_rg_unique`(`rg`);
CREATE TABLE `Users`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP NOT NULL,
    `updated_at` TIMESTAMP NOT NULL
);
ALTER TABLE
    `Users` ADD UNIQUE `users_email_unique`(`email`);
CREATE TABLE `Genders`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `gender` VARCHAR(255) NOT NULL
);
CREATE TABLE `OperationTypes`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL
);
ALTER TABLE
    `OperationTypes` ADD UNIQUE `operationtypes_name_unique`(`name`);
CREATE TABLE `AccessHistory`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Users_id` INT UNSIGNED NOT NULL,
    `Platform_id` INT UNSIGNED NOT NULL,
    `last_access` DATETIME NOT NULL
);
CREATE TABLE `Platforms`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` INT NOT NULL
);
ALTER TABLE
    `Tickers` ADD CONSTRAINT `tickers_stocks_id_foreign` FOREIGN KEY(`Stocks_id`) REFERENCES `Stocks`(`id`);
ALTER TABLE
    `AccountsBalance` ADD CONSTRAINT `accountsbalance_users_id_foreign` FOREIGN KEY(`Users_id`) REFERENCES `Users`(`id`);
ALTER TABLE
    `Wallets` ADD CONSTRAINT `wallets_userslogin_id_foreign` FOREIGN KEY(`UsersLogin_id`) REFERENCES `Users`(`id`);
ALTER TABLE
    `Orders` ADD CONSTRAINT `orders_users_id_foreign` FOREIGN KEY(`Users_id`) REFERENCES `Users`(`id`);
ALTER TABLE
    `AccountsStatement` ADD CONSTRAINT `accountsstatement_users_id_foreign` FOREIGN KEY(`Users_id`) REFERENCES `Users`(`id`);
ALTER TABLE
    `AccessHistory` ADD CONSTRAINT `accesshistory_users_id_foreign` FOREIGN KEY(`Users_id`) REFERENCES `Users`(`id`);
ALTER TABLE
    `Orders` ADD CONSTRAINT `orders_transactions_id_foreign` FOREIGN KEY(`Transactions_id`) REFERENCES `Transactions`(`id`);
ALTER TABLE
    `Transactions` ADD CONSTRAINT `transactions_wallets_id_foreign` FOREIGN KEY(`Wallets_id`) REFERENCES `Wallets`(`id`);
ALTER TABLE
    `Transactions` ADD CONSTRAINT `transactions_tickers_id_foreign` FOREIGN KEY(`Tickers_id`) REFERENCES `Tickers`(`id`);
ALTER TABLE
    `Transactions` ADD CONSTRAINT `transactions_operationtypes_id_foreign` FOREIGN KEY(`OperationTypes_id`) REFERENCES `OperationTypes`(`id`);
ALTER TABLE
    `AccountsStatement` ADD CONSTRAINT `accountsstatement_operationtypes_id_foreign` FOREIGN KEY(`OperationTypes_id`) REFERENCES `OperationTypes`(`id`);
ALTER TABLE
    `FSExchangeOverview` ADD CONSTRAINT `fsexchangeoverview_tickers_id_foreign` FOREIGN KEY(`Tickers_id`) REFERENCES `Tickers`(`id`);
ALTER TABLE
    `PersonalDatas` ADD CONSTRAINT `personaldatas_users_id_foreign` FOREIGN KEY(`Users_id`) REFERENCES `Users`(`id`);
ALTER TABLE
    `Addresses` ADD CONSTRAINT `addresses_personaldatas_id_foreign` FOREIGN KEY(`PersonalDatas_id`) REFERENCES `PersonalDatas`(`id`);
ALTER TABLE
    `PersonalDatas` ADD CONSTRAINT `personaldatas_genders_id_foreign` FOREIGN KEY(`Genders_id`) REFERENCES `Genders`(`id`);
ALTER TABLE
    `AccessHistory` ADD CONSTRAINT `accesshistory_platform_id_foreign` FOREIGN KEY(`Platform_id`) REFERENCES `Platforms`(`id`);