import { Router } from 'express';
import usersRoute from './users.route';
import stocksRoute from './stocks.route';

const routers = Router();

routers.use('/signup', usersRoute);
// routers.use('/signin', siginInRoute);
routers.use('/asset', stocksRoute);

export default routers;
