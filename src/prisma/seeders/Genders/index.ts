// seed Gender
import { PrismaClient } from '@prisma/client';
import Genders from '../../../data/seeds/Genders.json';

const sGenders = (prisma: PrismaClient) => Genders.map(async (gender) => prisma.genders.create({
  data: {
    name: gender,
  },
}));

export default sGenders;
