import usersController from '@controllers/users.controller';
import validate from '@middlewares/dto-validator.mid';
import dto from '@middlewares/DTOs';
import { Router } from 'express';

require('express-async-errors');

const signUpRoute = Router();

signUpRoute.post('/', validate(dto.signUpDTO), usersController.signUp);

export default signUpRoute;
