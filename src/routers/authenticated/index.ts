import mid from '@middlewares/index';
import { Router } from 'express';
import stocksRoute from './stocks.route';
import accountRoute from './account.route';
import walletsRoute from './wallets.route';
import investimentsRoute from './investimentsRoute';

const authenticatedRouters = Router();

authenticatedRouters.use(mid.auth);

// refresh signin with autm middleware
authenticatedRouters.use('/asset', stocksRoute);
authenticatedRouters.use('/wallets', walletsRoute);
authenticatedRouters.use('/account', accountRoute);
authenticatedRouters.use('/investiments', investimentsRoute);

export default authenticatedRouters;
