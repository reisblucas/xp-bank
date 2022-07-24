import SwaggerController from '@controllers/swagger.controller';
import { Router } from 'express';

const swaggerRoute = Router();

swaggerRoute.get('/swg/swagger.json', SwaggerController.getStats);

export default swaggerRoute;
