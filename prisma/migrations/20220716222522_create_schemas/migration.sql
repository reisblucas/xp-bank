-- CreateTable
CREATE TABLE "AccountsBalance" (
    "id" SERIAL NOT NULL,
    "UsersLogin_id" INTEGER NOT NULL,
    "AccountsStatement_value" DOUBLE PRECISION NOT NULL,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "AccountsBalance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountsStatement" (
    "id" SERIAL NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "Orders_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "AccountsStatement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Addresses" (
    "id" SERIAL NOT NULL,
    "logradouro" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "number" INTEGER NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "district" VARCHAR(255) NOT NULL,
    "state" VARCHAR(255) NOT NULL,
    "country" VARCHAR(255) NOT NULL,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "Addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FSExchangeOverview" (
    "id" SERIAL NOT NULL,
    "opening_price" DOUBLE PRECISION NOT NULL,
    "closing_price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "max" DOUBLE PRECISION NOT NULL,
    "min" DOUBLE PRECISION NOT NULL,
    "lot_min" INTEGER NOT NULL,
    "date" DATE NOT NULL,

    CONSTRAINT "FSExchangeOverview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" SERIAL NOT NULL,
    "Transactions_id" INTEGER NOT NULL,
    "order_executed" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL,
    "sale_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonalDatas" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "cpf" INTEGER NOT NULL,
    "rg" INTEGER NOT NULL,
    "UsersLogin_id" INTEGER NOT NULL,
    "Address_id" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "PersonalDatas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stocks" (
    "id" SERIAL NOT NULL,
    "symbol" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Stocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StocksFSExchangeOverview" (
    "id" SERIAL NOT NULL,
    "Stocks_id" INTEGER NOT NULL,
    "FSExchangeOverview_id" INTEGER NOT NULL,

    CONSTRAINT "StocksFSExchangeOverview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tickers" (
    "id" SERIAL NOT NULL,
    "Stocks_id" INTEGER NOT NULL,
    "ticker" VARCHAR(255) NOT NULL,

    CONSTRAINT "Tickers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transactions" (
    "id" SERIAL NOT NULL,
    "Wallets_id" INTEGER NOT NULL,
    "Stocks_symbol" VARCHAR(255) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "type" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersLogin" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "UsersLogin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wallets" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "UsersLogin_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "Wallets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AccountsBalance_UsersLogin_id_idx" ON "AccountsBalance"("UsersLogin_id");

-- CreateIndex
CREATE INDEX "AccountsStatement_Orders_id_idx" ON "AccountsStatement"("Orders_id");

-- CreateIndex
CREATE UNIQUE INDEX "fsexchangeoverview_date_unique" ON "FSExchangeOverview"("date");

-- CreateIndex
CREATE INDEX "Orders_Transactions_id_idx" ON "Orders"("Transactions_id");

-- CreateIndex
CREATE UNIQUE INDEX "personaldatas_cpf_unique" ON "PersonalDatas"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "personaldatas_rg_unique" ON "PersonalDatas"("rg");

-- CreateIndex
CREATE INDEX "PersonalDatas_Address_id_idx" ON "PersonalDatas"("Address_id");

-- CreateIndex
CREATE INDEX "PersonalDatas_UsersLogin_id_idx" ON "PersonalDatas"("UsersLogin_id");

-- CreateIndex
CREATE UNIQUE INDEX "stocks_symbol_unique" ON "Stocks"("symbol");

-- CreateIndex
CREATE INDEX "StocksFSExchangeOverview_FSExchangeOverview_id_idx" ON "StocksFSExchangeOverview"("FSExchangeOverview_id");

-- CreateIndex
CREATE INDEX "StocksFSExchangeOverview_Stocks_id_idx" ON "StocksFSExchangeOverview"("Stocks_id");

-- CreateIndex
CREATE UNIQUE INDEX "tickers_ticker_unique" ON "Tickers"("ticker");

-- CreateIndex
CREATE INDEX "Tickers_Stocks_id_idx" ON "Tickers"("Stocks_id");

-- CreateIndex
CREATE INDEX "Transactions_Wallets_id_idx" ON "Transactions"("Wallets_id");

-- CreateIndex
CREATE UNIQUE INDEX "userslogin_email_unique" ON "UsersLogin"("email");

-- CreateIndex
CREATE INDEX "Wallets_UsersLogin_id_idx" ON "Wallets"("UsersLogin_id");

-- AddForeignKey
ALTER TABLE "AccountsBalance" ADD CONSTRAINT "accountsbalance_userslogin_id_foreign" FOREIGN KEY ("UsersLogin_id") REFERENCES "UsersLogin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "AccountsStatement" ADD CONSTRAINT "accountsstatement_orders_id_foreign" FOREIGN KEY ("Orders_id") REFERENCES "Orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "orders_transactions_id_foreign" FOREIGN KEY ("Transactions_id") REFERENCES "Transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PersonalDatas" ADD CONSTRAINT "personaldatas_address_id_foreign" FOREIGN KEY ("Address_id") REFERENCES "Addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PersonalDatas" ADD CONSTRAINT "personaldatas_userslogin_id_foreign" FOREIGN KEY ("UsersLogin_id") REFERENCES "UsersLogin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "StocksFSExchangeOverview" ADD CONSTRAINT "stocksfsexchangeoverview_fsexchangeoverview_id_foreign" FOREIGN KEY ("FSExchangeOverview_id") REFERENCES "FSExchangeOverview"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "StocksFSExchangeOverview" ADD CONSTRAINT "stocksfsexchangeoverview_stocks_id_foreign" FOREIGN KEY ("Stocks_id") REFERENCES "Stocks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Tickers" ADD CONSTRAINT "tickers_stocks_id_foreign" FOREIGN KEY ("Stocks_id") REFERENCES "Stocks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "transactions_wallets_id_foreign" FOREIGN KEY ("Wallets_id") REFERENCES "Wallets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Wallets" ADD CONSTRAINT "wallets_userslogin_id_foreign" FOREIGN KEY ("UsersLogin_id") REFERENCES "UsersLogin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
