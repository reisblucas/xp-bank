// seed Gender
import { PrismaClient } from '@prisma/client';
import Platforms from '../../../data/seeds/Platforms.json';

const Platform = (prisma: PrismaClient) => Platforms.map(async (p) => prisma.platform.create({
  data: {
    name: p,
  },
}));

export default Platform;
