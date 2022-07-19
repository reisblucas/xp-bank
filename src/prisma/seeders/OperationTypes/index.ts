import { PrismaClient } from '@prisma/client';
import OperationTypes from '../../../data/seeds/OperationTypes.json';

const sOperationTypes = (prisma: PrismaClient) => OperationTypes
  .map(async (op) => prisma.operationTypes.create({
    data: {
      id: op.id,
      name: op.name,
    },
  }));

export default sOperationTypes;
