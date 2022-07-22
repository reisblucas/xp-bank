import { Decimal } from '@prisma/client/runtime';

export const increaseBalance = (
  accBalance: Decimal,
  quantity: number,
) => Number(accBalance) + quantity;

export const decreaseBalance = (
  accBalance: Decimal,
  quantity: number,
) => Number(accBalance) - quantity;
