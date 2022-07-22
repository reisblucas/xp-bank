import usersController from '@controllers/users.controller';
import { Router } from 'express';

const accountRoute = Router();

accountRoute.use('/', usersController.getBalance);

export default accountRoute;
