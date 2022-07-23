
import { Router } from 'express';
const router = Router();
import serverRouter from './server'
import meRouter from './me';
import siteRouter from './site';
import auth from '../app/middleware/auth';
import author from '../app/middleware/authorization';
import userRoute from './Userct';

router.use('/server', auth.requireAuth, serverRouter);
router.use('/me', auth.requireAuth, meRouter);
router.use('/user', author.requireAuthorization, userRoute)
router.use('/', siteRouter);

export default router;
