import { writeFile } from 'fs';
import ENoMagicNumbers from 'src/__interfaces__/nomagicnum.enum';
import UnserializedOverview from '../data/seeds/UnserializedOverview.json';

// pos | key
// 1 -> name
// 2 -> class (ON, PN or UNIT)
// 3 -> last price selled
// 4 -> max
// 5 -> min
// 6 -> var
// 7 -> var%
// 8 -> vol ('x'M -> Millions)
// 9 -> hour

interface IStocksOverview {
  name: string;
  class: string;
  lastSell: number;
  max: number;
  min: number;
  var: string;
  varPercent: string;
  vol: number;
  lastCheck: string;
}

// serialize to number and turn into million
const serializeVolField = (vol: string): number => {
  const { MILLION } = ENoMagicNumbers;

  const Mposition = vol.indexOf('M');
  const sliced = vol.slice(0, Mposition);

  return Number(sliced) * +MILLION;
};

const serializeStocksInfo = () => UnserializedOverview
  .map((str: string) => {
    const key = {} as IStocksOverview;

    str.split(',')
      .forEach((field: string, i: number) => {
        if (i === 0) key.name = field;
        if (i === 1) key.class = field;
        if (i === 2) key.lastSell = Number(field);
        if (i === 3) key.max = Number(field);
        if (i === 4) key.min = Number(field);
        if (i === 5) key.var = field;
        if (i === 6) key.varPercent = field;
        if (i === 7) key.vol = serializeVolField(field);
        if (i === 8) key.lastCheck = field;
      });
    return key;
  });

const serialized = serializeStocksInfo();

const createNewFile = (path: string) => {
  writeFile(path, JSON.stringify(serialized, null), (err) => {
    if (err) console.log('Error when write file: ', err);
    console.log('File created succesfully!');
  });
};

export default createNewFile;
