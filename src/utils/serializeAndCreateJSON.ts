import { writeFile } from 'fs';
import ENoMagicNumbers from 'src/__interfaces__/nomagicnum.enum';
import UnserializedFromInfoMoney from '../data/seeds/UnserializedFromInfoMoney.json';

// pos. | key
// 1 -> ticker
// 2 -> lastSell
// 3 -> max
// 4 -> min
// 5 -> varDay
// 6 -> varSem
// 7 -> varYear%
// 8 -> var12m
// 9 -> vol ('x'M -> Millions)
// 10 -> date

interface IStocksOverview {
  ticker: string;
  date: string;
  lastSell: number;
  max: number;
  min: number;
  varDay: number;
  varSem: number;
  varYear: number;
  var12m: number;
  vol: number;
}

// serialize to number and turn into million
const serializeVolField = (vol: string): number => {
  const { MILLION } = ENoMagicNumbers;

  const Mposition = vol.indexOf('M');
  const sliced = vol.slice(0, Mposition);

  return Math.floor(Number(sliced) * +MILLION);
};

const concatYear = (date: string): string => `${date}/${new Date().getFullYear()}`;

const serializeStocksInfo = (): IStocksOverview[] => UnserializedFromInfoMoney
  .map((str: string) => {
    const key = {} as IStocksOverview;

    str.split(',')
      .forEach((field: string, i: number) => {
        const dataTrimmed = field.trim();
        if (i === 0) key.ticker = dataTrimmed;
        if (i === 1) key.date = concatYear(dataTrimmed);
        if (i === 2) key.lastSell = Number(dataTrimmed);
        if (i === 3) key.max = Number(dataTrimmed);
        if (i === 4) key.max = Number(dataTrimmed);
        if (i === 5) key.min = Number(dataTrimmed);
        if (i === 6) key.varDay = Number(dataTrimmed);
        if (i === 7) key.varSem = Number(dataTrimmed);
        if (i === 8) key.varYear = Number(dataTrimmed);
        if (i === 9) key.vol = serializeVolField(dataTrimmed);
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
