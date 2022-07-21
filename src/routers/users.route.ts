import usersController from '@controllers/users.controller';
import validate from '@middlewares/validate.mid';
import dto from '@middlewares/DTOs';
import { Router } from 'express';

require('express-async-errors');

const usersRoute = Router();

usersRoute.post('/', validate(dto.signUpDTO), usersController.signUp);

export default usersRoute;
