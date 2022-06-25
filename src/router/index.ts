
import { Router } from 'express';
const router = Router();
import serverRouter from './server'
import meRouter from './me';
import siteRouter from './site';

router.use('/server', serverRouter);
router.use('/me',meRouter);
router.use('/',siteRouter);

export default router;
