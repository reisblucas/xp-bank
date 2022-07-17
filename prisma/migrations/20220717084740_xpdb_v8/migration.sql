-- CreateTable
CREATE TABLE `AccountsBalance` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `UsersLogin_id` INTEGER UNSIGNED NOT NULL,
    `balance` DOUBLE NOT NULL,
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `accountsbalance_userslogin_id_foreign`(`UsersLogin_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AccountsStatement` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `value` DOUBLE NOT NULL,
    `Orders_id` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `accountsstatement_orders_id_foreign`(`Orders_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Addresses` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `logradouro` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `number` INTEGER NOT NULL,
    `city` VARCHAR(255) NOT NULL,
    `district` VARCHAR(255) NOT NULL,
    `state` VARCHAR(255) NOT NULL,
    `country` VARCHAR(255) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FSExchangeOverview` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `opening_price` DOUBLE NOT NULL,
    `closing_price` DOUBLE NOT NULL,
    `quantity` INTEGER UNSIGNED NOT NULL,
    `max` DOUBLE NOT NULL,
    `min` DOUBLE NOT NULL,
    `lot_min` INTEGER UNSIGNED NOT NULL,
    `date` DATETIME(0) NOT NULL,

    UNIQUE INDEX `fsexchangeoverview_date_unique`(`date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Orders` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `Transactions_id` INTEGER UNSIGNED NOT NULL,
    `order_executed` BOOLEAN NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `sale_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `orders_transactions_id_foreign`(`Transactions_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PersonalDatas` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `cpf` INTEGER UNSIGNED NOT NULL,
    `rg` INTEGER UNSIGNED NOT NULL,
    `UsersLogin_id` INTEGER UNSIGNED NOT NULL,
    `Address_id` INTEGER UNSIGNED NOT NULL,
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `personaldatas_cpf_unique`(`cpf`),
    UNIQUE INDEX `personaldatas_rg_unique`(`rg`),
    INDEX `personaldatas_address_id_foreign`(`Address_id`),
    INDEX `personaldatas_userslogin_id_foreign`(`UsersLogin_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Stocks` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `symbol` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `stocks_symbol_unique`(`symbol`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StocksFSExchangeOverview` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `Stocks_id` INTEGER UNSIGNED NOT NULL,
    `FSExchangeOverview_id` INTEGER UNSIGNED NOT NULL,

    INDEX `stocksfsexchangeoverview_fsexchangeoverview_id_foreign`(`FSExchangeOverview_id`),
    INDEX `stocksfsexchangeoverview_stocks_id_foreign`(`Stocks_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tickers` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `Stocks_id` INTEGER UNSIGNED NOT NULL,
    `ticker` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `tickers_ticker_unique`(`ticker`),
    INDEX `tickers_stocks_id_foreign`(`Stocks_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transactions` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `Wallets_id` INTEGER UNSIGNED NOT NULL,
    `Stocks_symbol` VARCHAR(255) NOT NULL,
    `quantity` INTEGER UNSIGNED NOT NULL,
    `price` DOUBLE NOT NULL,
    `type` BOOLEAN NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `transactions_wallets_id_foreign`(`Wallets_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UsersLogin` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `userslogin_email_unique`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Wallets` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `UsersLogin_id` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `wallets_userslogin_id_foreign`(`UsersLogin_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
