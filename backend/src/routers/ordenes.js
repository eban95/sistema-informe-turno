import { Router } from 'express';
import ordenesController from '../controllers/ordenes.js';

const ordenesRouter = Router();

ordenesRouter.post('/', ordenesController.create);
ordenesRouter.get('/', ordenesController.readAll);

export default ordenesRouter;