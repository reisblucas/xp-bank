import security from '@utils/security';
import app from './app';
import 'dotenv/config';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(
  `I'm listening you on port ${PORT}, my young padawan`,
));

// console.log('encrypter: \n', security.encrypter('lucas'), '\n');
// console.log('hasher: \n', security.hasher('lucas'), '\n');
// console.log('encryptAndHash: \n', security.encryptAndHash('lucas'), '\n');

// const local_salt = process.env.SALT as string;
const pwdDb = 'pwssR+spUuulNHUHv0A25s2Q+FQLm5KRIgTACyCg4NQ=';
const saltDb = 'fQzGumqpEIi7PlrvzTO+1JSLX1M8c+EW5f8VvydLrXk=';

console.log('if info hashed', security.validateHash(pwdDb, saltDb));
console.log('pwd encrypted ', security.validateHash('lucas', saltDb));
