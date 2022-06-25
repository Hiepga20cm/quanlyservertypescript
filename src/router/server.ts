
import { Router } from 'express';
const router = Router();
import ServerController from '../app/controller/ServerController';



router.post('/store', ServerController.store);
router.get('/create', ServerController.create);
router.get('/:id/edit', ServerController.edit);
router.patch('/:id', ServerController.update);
router.patch('/:id/restore', ServerController.restore);
router.patch('/delete/:id', ServerController.destroy);
router.delete('/:id/deleteindatabase', ServerController.deleteindatabase);
router.get('/:name', ServerController.show);

export default router;
