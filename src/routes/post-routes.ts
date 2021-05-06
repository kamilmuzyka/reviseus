/** @module Routes/PostRoutes */
import { Router } from 'express';
import { protect } from '../lib/auth.js';
import { createNewPost } from '../controllers/post-controllers.js';

const router = Router();

router.post('/', protect, createNewPost);

export default router;
