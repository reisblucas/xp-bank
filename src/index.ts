import app from './app';
import 'dotenv/config';
import changeFormat from '@utils/dateChangeFormat';
// import newDateMethods from '@utils/newDateMethods';
// import createNewFile from '@utils/serializeAndCreateJSON';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(
  `I'm listening you on port ${PORT}, my young padawan`,
));

// console.log('encrypter: \n', security.encrypter('lucas'), '\n');
// console.log('hasher: \n', security.hasher('lucas'), '\n');
// console.log('encryptAndHash: \n', security.encryptAndHash('lucas'), '\n');

// createNewFile('./src/data/seeds/SerializedInfoMoney.json');

// console.log(newDateMethods.Dplus2());
console.log('1', changeFormat('20,03,2016', 'dmy'));
console.log('2', changeFormat('20,03,2016', 'dym'));
console.log('3', changeFormat('20,03,2016', 'myd'));
console.log('4', changeFormat('20,03,2016', 'mdy'));
console.log('5', changeFormat('20,03,2016', 'ydm'));
console.log('6', changeFormat('20,03,2016', 'ymd'));
