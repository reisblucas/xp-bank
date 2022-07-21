import usersController from '@controllers/users.controller';
import signInDTO from '@middlewares/DTOs/sign-in.dto';
import validate from '@middlewares/validate.mid';
import { Router } from 'express';

const signInRoute = Router();

signInRoute.post('/', validate(signInDTO), usersController.signIn);

export default signInRoute;
