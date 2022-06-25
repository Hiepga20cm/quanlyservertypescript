
import { Router } from 'express';
const router = Router();
import MeController from '../app/controller/MeController';


//router.get('/getall',ServerController.getAllServer);

router.get('/stored/server', MeController.storedServer);

router.get('/trash/server', MeController.trashServer);

export default router;