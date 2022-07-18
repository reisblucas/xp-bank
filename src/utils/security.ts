import { createHash, randomBytes } from 'crypto';
import { ISalt } from 'src/__interfaces__/salt.interface';

const CSPRNG = () => randomBytes(256).toString('base64');

const salt: ISalt = {
  dynamic: '',
};

const hasher = (str: string) => createHash('sha256').update(str).digest('base64');

const localSalt = process.env.SALT as string;

const encrypter = (pwd: string): string => {
  const randomSalt = CSPRNG();
  const hashSalt = hasher(randomSalt);

  salt.dynamic = hashSalt;

  return `${localSalt}${pwd}${randomSalt}`;
};

const encryptAndHash = (str: string) => hasher(encrypter(str));

const validateHash = (pwdDbOrReq: string, dynamicSalt: string) => {
  const toVerify = `${localSalt}${pwdDbOrReq}${dynamicSalt}`;
  return hasher(toVerify);
};

const security = {
  salt,
  encrypter,
  hasher,
  encryptAndHash,
  validateHash,
};

export default security;
