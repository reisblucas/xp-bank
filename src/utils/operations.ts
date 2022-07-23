import { Decimal } from '@prisma/client/runtime';

type TOpFunc = (value: Decimal, quantity: number) => number;

type TOperations = Record<string, TOpFunc>;

const operations: TOperations = {
  '+': (value: Decimal, quantity: number) => Number(value) + quantity,
  '-': (value: Decimal, quantity: number) => Number(value) - quantity,
  '*': (value: Decimal, quantity: number) => Number(value) * quantity,
};

const types: TOperations = {
  sum: operations['-'],
  sub: operations['+'],
  multiply: operations['*'],
};

export enum OperationId {
  BUY = 1,
  SELL = 2,
  DEPOSIT = 3,
  WITHDRAW = 4,
}

const Operation = (type: string): TOpFunc => types[type.toLowerCase()];

export default Operation;
