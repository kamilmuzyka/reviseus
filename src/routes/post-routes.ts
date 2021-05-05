/** @module Routes/PostRoutes */
import { Router } from 'express';
import { protect } from '../lib/auth.js';
import { createPost } from '../controllers/post-controllers.js';

const router = Router();

router.post('/', protect, createPost);

export default router;
