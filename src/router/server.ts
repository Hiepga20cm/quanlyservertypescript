
import { Router } from 'express';
const router = Router();
import ServerController from '../app/controller/ServerController';
import author from '../app/middleware/authorization';


router.post('/store', ServerController.store);
router.get('/:id/edit',author.requireAuthorization, ServerController.edit);
router.patch('/:id',author.requireAuthorization ,ServerController.update);
router.patch('/:id/restore', author.requireAuthorization,ServerController.restore);
router.patch('/delete/:id', ServerController.destroy);
router.delete('/:id/deleteindatabase',author.requireAuthorization, ServerController.deleteindatabase);
router.get('/:id/detail', ServerController.showDetail);

export default router;
