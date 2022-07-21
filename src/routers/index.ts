import { Router } from 'express';
import signUpRoute from './login.route';
import stocksRoute from './stocks.route';

const routers = Router();

routers.use('/signup', signUpRoute);
// routers.use('/signin', siginInRoute);
routers.use('/asset', stocksRoute);

export default routers;
