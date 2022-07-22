import { Decimal } from '@prisma/client/runtime';

type TOperations = Record<string, (v: Decimal, q: number) => number>;

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

// OPERATION methods: now
// has fast-forward operation to
//  BUY/SELL/DEPOSIT/WITHDRAW

export enum OperationId {
  BUY = 1,
  SELL = 2,
  DEPOSIT = 3,
  WITHDRAW = 4,
}

export const Operation = (type: string) => types[type.toLowerCase()];
