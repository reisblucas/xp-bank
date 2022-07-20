// seed Gender
import { PrismaClient } from '@prisma/client';
import Platforms from '../../../data/seeds/Platforms.json';

const sPlatforms = (prisma: PrismaClient) => Platforms.map(async (p) => prisma.platform.create({
  data: {
    name: p,
  },
}));

export default sPlatforms;
