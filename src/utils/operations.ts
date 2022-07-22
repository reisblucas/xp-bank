import { Decimal } from '@prisma/client/runtime';

type TOperations = Record<string, (value: Decimal, quantity: number) => number>;

const operations: TOperations = {
  '+': (value: Decimal, quantity: number) => Number(value) + quantity,
  '-': (value: Decimal, quantity: number) => Number(value) - quantity,
  '*': (value: Decimal, quantity: number) => Number(value) * quantity,
};

enum SameOps {
  buy = 'withdraw',
  sell = 'deposit',
}

const types: TOperations = {
  [SameOps.buy]: operations['-'],
  [SameOps.sell]: operations['+'],
  multiply: operations['*'],
};

export enum OperationId {
  BUY = 1,
  SELL = 2,
  DEPOSIT = 3,
  WITHDRAW = 4,
}

export const Operation = (type: string) => types[type.toLowerCase()];
