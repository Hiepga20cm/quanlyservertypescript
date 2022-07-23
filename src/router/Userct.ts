
import { Router } from 'express';
const router = Router();
import Usercontroller from '../app/controller/Usercontroller';

router.get('/getUsers', Usercontroller.getallUser);
router.post('/register', Usercontroller.register);
router.delete('/:id/deleteUser/', Usercontroller.deleteUser);
router.get('/:id/updateUser', Usercontroller.updateUser);
router.patch('/:id/update', Usercontroller.update);

export default router;