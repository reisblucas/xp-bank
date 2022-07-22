import mid from '@middlewares/index';
import { Router } from 'express';
import stocksRoute from './stocks.route';
import usersRoute from './users.route';
import walletsRoute from './wallets.route';

const authenticatedRouters = Router();

authenticatedRouters.use(mid.auth);

// refresh signin with autm middleware
authenticatedRouters.use('/asset', stocksRoute);
authenticatedRouters.use('/wallets', walletsRoute);
authenticatedRouters.use('/account', usersRoute);

export default authenticatedRouters;
