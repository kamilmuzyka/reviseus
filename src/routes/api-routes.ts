/** @module Routes/APIRoutes */
import { Router } from 'express';
import userRoutes from './user-routes.js';
import postRoutes from './post-routes.js';
import fileRoutes from './file-routes.js';

const router = Router();

router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/uploads', fileRoutes);

export default router;
