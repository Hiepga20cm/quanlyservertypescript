
import { Router } from 'express';
const router = Router();
import SiteController from '../app/controller/SiteController';
import authMiddleware from '../app/middleware/auth';


router.get('/logout', authMiddleware.requireAuth, SiteController.logout);
router.get('/', authMiddleware.requireAuth, SiteController.home);
router.get('/search', authMiddleware.requireAuth, SiteController.search);
router.post('/login', SiteController.login);


export default router;