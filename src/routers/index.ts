import { Router } from 'express';
import signInRoute from './sign-in.route';
import siginUpRoute from './sign-up.route';
import stocksRoute from './stocks.route';

const routers = Router();

routers.use('/signup', siginUpRoute);
routers.use('/signin', signInRoute);
routers.use('/asset', stocksRoute);

export default routers;
