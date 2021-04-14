/** @module Routes/UserRoutes */
import { Router } from 'express';
import { protect } from '../lib/auth.js';
import { getUser, getCurrentUser } from '../controllers/user-controllers.js';

const router = Router();

router.get('/:id', getUser);
router.get('/', protect, getCurrentUser);

export default router;
