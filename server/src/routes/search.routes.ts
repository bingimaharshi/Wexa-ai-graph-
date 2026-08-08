import { Router } from 'express';
import { searchEntities } from '../controllers/search.controller.js';

const router = Router();

router.get('/', searchEntities);

export default router;
