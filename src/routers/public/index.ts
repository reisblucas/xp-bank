import { Router } from 'express';
import signInRoute from './sign-in.route';
import siginUpRoute from './sign-up.route';

const unauthenticatedRouters = Router();

unauthenticatedRouters.use('/signin', signInRoute);
unauthenticatedRouters.use('/signup', siginUpRoute);

export default unauthenticatedRouters;
