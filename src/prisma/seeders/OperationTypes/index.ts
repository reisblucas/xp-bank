import { PrismaClient } from '@prisma/client';

const OperationTypes = [
  'Buy',
  'Sell',
  'Deposit',
  'Withdraw',
];

const sOperationTypes = (prisma: PrismaClient) => OperationTypes
  .map(async (op) => prisma.operationTypes.create({
    data: {
      name: op,
    },
  }));

export default sOperationTypes;
