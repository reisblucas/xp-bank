import { Router } from 'express';
import siginUpRoute from './sign-up.route';

const routers = Router();

routers.use('/signup', siginUpRoute);

export default routers;
