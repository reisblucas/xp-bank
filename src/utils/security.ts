import { createHash, randomBytes } from 'crypto';
import { ISalt, ISecurity } from 'src/__interfaces__/security.interface';

const CSPRNG = () => randomBytes(256).toString('base64');

const salt: ISalt = {
  dynamic: '',
};

const localSalt = process.env.SALT as string;

const hasher = (str: string): string => createHash('sha256').update(str).digest('base64');

const encrypter = (pwd: string): string => {
  const randomSalt = CSPRNG();
  const pwdHash = hasher(pwd);
  const saltHash = hasher(randomSalt);

  salt.dynamic = saltHash;

  return `${localSalt}${pwdHash}${saltHash}`;
};

const encryptAndHash = (str: string): string => hasher(encrypter(str));

// Validate area
const reverseEngineer = (
  pwdClient: string,
  saltDb: string,
) => {
  const pwdHashed = hasher(pwdClient);
  return hasher(`${localSalt}${pwdHashed}${saltDb}`);
};

const validateHash = (pwdDb: string, pwdClient: string, saltDb: string): boolean => {
  const hashedNow = reverseEngineer(pwdClient, saltDb);

  // pwdb is actually hashed in db | now only compare with the reverseEngineer
  return pwdDb === hashedNow;
};

const security: ISecurity = {
  salt,
  encrypter,
  hasher,
  encryptAndHash,
  validateHash,
};

export default security;
