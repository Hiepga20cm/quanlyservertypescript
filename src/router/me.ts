
import { Router } from 'express';
const router = Router();
import MeController from '../app/controller/MeController';
import authorization from '../app/middleware/authorization';
import authMiddleware from '../app/middleware/auth';
//router.get('/getall',ServerController.getAllServer);

router.get('/stored/server', authMiddleware.requireAuth, MeController.storedServer);

router.get('/trash/server', authorization.requireAuthorization, MeController.trashServer);

export default router;