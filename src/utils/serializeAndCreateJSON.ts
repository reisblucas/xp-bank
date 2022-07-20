import { writeFile } from 'fs';
import UnserializedFromInfoMoney from '../data/seeds/UnserializedFromInfoMoney.json';

// pos. | key
// 1 -> ticker
// 2 -> lastSell
// 3 -> max
// 4 -> min
// 5 -> varDay
// 6 -> varSem
// 7 -> varMon
// 8 -> varYear%
// 9 -> var12m
// 10 -> vol ('x'M -> Millions)
// 11 -> date

const abbrevLiterals: Record<string, number> = {
  K: 10 ** 3,
  M: 10 ** 6,
  B: 10 ** 9,
};

const getAbbreviation = (str: string): string => str[str.length - 1];

// serialize to number and turn into million
const serializeVolField = (vol: string): number => {
  const abbreviation: string = getAbbreviation(vol);
  const abbrevPosition = vol.indexOf(abbreviation);
  const sliced = vol.slice(0, abbrevPosition);

  return Math.floor(Number(sliced) * (abbrevLiterals[abbreviation]));
};

const concatYear = (date: string): string => `${date}/${new Date().getFullYear()}`;

const stocksLiterals: Record<number, string> = {
  0: 'ticker',
  1: 'date',
  2: 'lastSell',
  3: 'varDay',
  4: 'varSem',
  5: 'varMon',
  6: 'varYear',
  7: 'var12m',
  8: 'max',
  9: 'min',
  10: 'vol',
};

type TAssLiteral = Record<number, (f: string) => string | number>;

const assignLiteral: TAssLiteral = {
  0: (field: string): string => field,
  1: (field: string): string => concatYear(field),
  2: (field: string): number => Number(field),
  3: (field: string): number => Number(field),
  4: (field: string): number => Number(field),
  5: (field: string): number => Number(field),
  6: (field: string): number => Number(field),
  7: (field: string): number => Number(field),
  8: (field: string): number => Number(field),
  9: (field: string): number => Number(field),
  10: (field: string): number => serializeVolField(field),
};

const serializeStocksInfo = () => UnserializedFromInfoMoney
  .map((str: string) => {
    const key: Record<string, string | number> = {};
    str.split(',')
      .forEach((field: string, i: number) => {
        const dataTrimmed = field.trim();
        key[stocksLiterals[i]] = assignLiteral[i](dataTrimmed);
      });
    return key;
  });

const createNewFile = (path: string) => {
  const serialized = serializeStocksInfo();

  writeFile(path, JSON.stringify(serialized, null), (err) => {
    if (err) console.log('Error when write file: ', err);
    console.log('File created succesfully!');
  });
};

export default createNewFile;
