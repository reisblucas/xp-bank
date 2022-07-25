import { sign, verify, SignOptions } from 'jsonwebtoken';
import { IJwtPayload } from 'src/__interfaces__/jwt.interface';
import * as dotenv from 'dotenv';

dotenv.config();

const SECRET = process.env.JWT_SECRET as string;

const signOpt: SignOptions = {
  algorithm: 'HS256',
  expiresIn: '10min',
};

const generateToken = (payload: IJwtPayload): string => sign(payload, SECRET, signOpt);

const validateToken = (token: string) => verify(token, SECRET);

const jwt = {
  generateToken,
  validateToken,
};

export default jwt;
