import usersController from '@controllers/users.controller';
import validate from '@middlewares/validate.mid';
import { Router } from 'express';
import signUpDTO from '@middlewares/DTOs/sign-up.dto';

require('express-async-errors');

const signUp = Router();

signUp.post('/', validate(signUpDTO), usersController.signUp);

export default signUp;
