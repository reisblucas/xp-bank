import usersController from '@controllers/users.controller';
import { Router } from 'express';

const accountRoute = Router();

accountRoute.get('/balance', usersController.getBalance);
accountRoute.get('/statement', usersController.getStatement);

export default accountRoute;
