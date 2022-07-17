CREATE TABLE `FSExchangeOverview`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `opening_price` DOUBLE NOT NULL,
    `closing_price` DOUBLE NOT NULL,
    `quantity` INT UNSIGNED NOT NULL,
    `max` DOUBLE NOT NULL,
    `min` DOUBLE NOT NULL,
    `lot_min` INT UNSIGNED NOT NULL,
    `date` DATETIME NOT NULL
);
ALTER TABLE
    `FSExchangeOverview` ADD UNIQUE `fsexchangeoverview_date_unique`(`date`);
CREATE TABLE `StocksFSExchangeOverview`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Stocks_id` INT UNSIGNED NOT NULL,
    `FSExchangeOverview_id` INT UNSIGNED NOT NULL
);
CREATE TABLE `Stocks`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `symbol` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL
);
ALTER TABLE
    `Stocks` ADD UNIQUE `stocks_symbol_unique`(`symbol`);
CREATE TABLE `Orders`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `UsersLogin_id` INT UNSIGNED NOT NULL,
    `Transactions_id` INT UNSIGNED NOT NULL,
    `order_executed` TINYINT(1) NOT NULL,
    `created_at` TIMESTAMP NOT NULL,
    `sale_at` TIMESTAMP NOT NULL
);
CREATE TABLE `Transactions`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Wallets_id` INT UNSIGNED NOT NULL,
    `Stocks_ticker` VARCHAR(255) NOT NULL,
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
    `UsersLogin_id` INT UNSIGNED NOT NULL,
    `OperationTypes_id` INT UNSIGNED NOT NULL,
    `created_at` TIMESTAMP NOT NULL
);
CREATE TABLE `AccountsBalance`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `UsersLogin_id` INT UNSIGNED NOT NULL,
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
    `logradouro` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `number` INT NOT NULL,
    `city` VARCHAR(255) NOT NULL,
    `district` VARCHAR(255) NOT NULL,
    `state` VARCHAR(255) NOT NULL,
    `country` VARCHAR(255) NOT NULL,
    `updated_at` TIMESTAMP NOT NULL
);
CREATE TABLE `PersonalDatas`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `cpf` INT UNSIGNED NOT NULL,
    `rg` INT UNSIGNED NOT NULL,
    `birth_date` DATETIME NOT NULL,
    `Genders_id` INT UNSIGNED NOT NULL,
    `UsersLogin_id` INT UNSIGNED NOT NULL,
    `updated_at` TIMESTAMP NOT NULL
);
ALTER TABLE
    `PersonalDatas` ADD UNIQUE `personaldatas_cpf_unique`(`cpf`);
ALTER TABLE
    `PersonalDatas` ADD UNIQUE `personaldatas_rg_unique`(`rg`);
CREATE TABLE `UsersLogin`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP NOT NULL,
    `updated_at` TIMESTAMP NOT NULL
);
ALTER TABLE
    `UsersLogin` ADD UNIQUE `userslogin_email_unique`(`email`);
CREATE TABLE `Genders`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `gender` VARCHAR(255) NOT NULL
);
CREATE TABLE `OperationTypes`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `type` VARCHAR(255) NOT NULL
);
ALTER TABLE
    `OperationTypes` ADD UNIQUE `operationtypes_type_unique`(`type`);
ALTER TABLE
    `StocksFSExchangeOverview` ADD CONSTRAINT `stocksfsexchangeoverview_stocks_id_foreign` FOREIGN KEY(`Stocks_id`) REFERENCES `Stocks`(`id`);
ALTER TABLE
    `Tickers` ADD CONSTRAINT `tickers_stocks_id_foreign` FOREIGN KEY(`Stocks_id`) REFERENCES `Stocks`(`id`);
ALTER TABLE
    `AccountsBalance` ADD CONSTRAINT `accountsbalance_userslogin_id_foreign` FOREIGN KEY(`UsersLogin_id`) REFERENCES `UsersLogin`(`id`);
ALTER TABLE
    `Wallets` ADD CONSTRAINT `wallets_userslogin_id_foreign` FOREIGN KEY(`UsersLogin_id`) REFERENCES `UsersLogin`(`id`);
ALTER TABLE
    `Orders` ADD CONSTRAINT `orders_userslogin_id_foreign` FOREIGN KEY(`UsersLogin_id`) REFERENCES `UsersLogin`(`id`);
ALTER TABLE
    `AccountsStatement` ADD CONSTRAINT `accountsstatement_userslogin_id_foreign` FOREIGN KEY(`UsersLogin_id`) REFERENCES `UsersLogin`(`id`);
ALTER TABLE
    `Orders` ADD CONSTRAINT `orders_transactions_id_foreign` FOREIGN KEY(`Transactions_id`) REFERENCES `Transactions`(`id`);
ALTER TABLE
    `Transactions` ADD CONSTRAINT `transactions_wallets_id_foreign` FOREIGN KEY(`Wallets_id`) REFERENCES `Wallets`(`id`);
ALTER TABLE
    `Transactions` ADD CONSTRAINT `transactions_operationtypes_id_foreign` FOREIGN KEY(`OperationTypes_id`) REFERENCES `OperationTypes`(`id`);
ALTER TABLE
    `StocksFSExchangeOverview` ADD CONSTRAINT `stocksfsexchangeoverview_fsexchangeoverview_id_foreign` FOREIGN KEY(`FSExchangeOverview_id`) REFERENCES `FSExchangeOverview`(`id`);
ALTER TABLE
    `AccountsStatement` ADD CONSTRAINT `accountsstatement_operationtypes_id_foreign` FOREIGN KEY(`OperationTypes_id`) REFERENCES `OperationTypes`(`id`);
ALTER TABLE
    `PersonalDatas` ADD CONSTRAINT `personaldatas_userslogin_id_foreign` FOREIGN KEY(`UsersLogin_id`) REFERENCES `UsersLogin`(`id`);
ALTER TABLE
    `Addresses` ADD CONSTRAINT `addresses_personaldatas_id_foreign` FOREIGN KEY(`PersonalDatas_id`) REFERENCES `PersonalDatas`(`id`);
ALTER TABLE
    `PersonalDatas` ADD CONSTRAINT `personaldatas_genders_id_foreign` FOREIGN KEY(`Genders_id`) REFERENCES `Genders`(`id`);