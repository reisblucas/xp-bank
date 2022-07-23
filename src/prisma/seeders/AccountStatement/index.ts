import { PrismaClient } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import AccountsStatement from '../../../data/seeds/AccountsStatement.json';

const operationLiterals: Record<number, (value: number) => number> = {
  1: (buy: number): number => -buy,
  2: (sell: number): number => Math.abs(sell),
  3: (deposit: number): number => Math.abs(deposit),
  4: (withdraw: number): number => -withdraw,
};

function formatValueBasedOperType(opId: number, value: number): Decimal {
  return new Decimal((operationLiterals[opId])(value));
}

const sAccountsStatement = (prisma: PrismaClient) => AccountsStatement
  .map(async ({
    value, UsersLogin_id, OperationTypes_id, created_at,
  }) => prisma.accountsStatement.create({
    data: {
      value: formatValueBasedOperType(OperationTypes_id, value),
      Users_id: UsersLogin_id,
      OperationTypes_id,
      created_at,
    },
  }));

export default sAccountsStatement;
