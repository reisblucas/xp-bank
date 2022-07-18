import { createHash, randomBytes } from 'crypto';

const CSPRNG = randomBytes(256).toString('base64');

const encrypter = (pwd: string): string => {
  const salt = process.env.SALT;
  return `${salt}${pwd}${CSPRNG}`;
};

const hasher = (str: string) => {
  return createHash('sha256').update(str).digest('base64');
}

const encryptAndHash = (str: string) => hasher(encrypter(str));

const security = {
  encrypter,
  hasher,
  encryptAndHash
}

export default security;
