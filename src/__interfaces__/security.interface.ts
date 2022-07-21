export interface ISalt {
  dynamic: string;
}

export interface ISecurity {
  salt: ISalt;
  hasher: (str: string) => string;
  encrypter: (pwd: string) => string,
  encryptAndHash: (str: string) => string;
  validateHash: (pwdDb: string, pwdClient: string, saltDb: string) => boolean;
}
