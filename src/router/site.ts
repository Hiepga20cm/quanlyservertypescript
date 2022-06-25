
import { Router } from 'express';
const router = Router();
import SiteController from '../app/controller/SiteController';



//router.get('/logout', SiteController.logout);
router.get('/', SiteController.home);
router.get('/search', SiteController.search);
router.post('/login', SiteController.login);
router.get('/login1', SiteController.login1);

export default router;