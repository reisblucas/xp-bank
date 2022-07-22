import { Decimal } from '@prisma/client/runtime';

export const increaseValue = (
  value: Decimal,
  quantity: number,
) => Number(value) + quantity;

export const decreaseValue = (
  value: Decimal,
  quantity: number,
) => Number(value) - quantity;
