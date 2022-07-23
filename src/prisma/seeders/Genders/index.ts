// seed Gender
import { PrismaClient } from '@prisma/client';
import Genders from '../../../data/seeds/Genders.json';

const sGenders = (prisma: PrismaClient) => Genders.map(async (gender) => prisma.genders.create({
  data: {
    id: gender.id,
    name: gender.name,
  },
}));

export default sGenders;
