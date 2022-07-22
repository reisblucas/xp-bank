import usersController from '@controllers/users.controller';
import { Router } from 'express';

const accountRoute = Router();

accountRoute.use('/balance', usersController.getBalance);
accountRoute.use('/statement', usersController.getStatement);

export default accountRoute;
