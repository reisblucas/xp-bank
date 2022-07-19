import app from './app';
import 'dotenv/config';
// import createNewFile from '@utils/serializeAndCreateJSON';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(
  `I'm listening you on port ${PORT}, my young padawan`,
));

// console.log('encrypter: \n', security.encrypter('lucas'), '\n');
// console.log('hasher: \n', security.hasher('lucas'), '\n');
// console.log('encryptAndHash: \n', security.encryptAndHash('lucas'), '\n');

// createNewFile('./src/data/seeds/SerializedInfoMoney.json');
