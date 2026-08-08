import { Router } from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/user.controller.js';

const router = Router();

router.get('/:id', getUserProfile);
router.put('/:id', updateUserProfile);

export default router;
