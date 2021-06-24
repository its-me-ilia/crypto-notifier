import {Router} from 'express';
import newest from '@controllers/newest';
const router = Router();

router.get('/api/v1/newest', newest);

export default router;
