/** @module Routes/APIRoutes */
import { Router } from 'express';
import userRoutes from './user-routes.js';
import postRoutes from './post-routes.js';
import groupRoutes from './group-routes.js';
import fileRoutes from './file-routes.js';
import searchRoutes from './search-routes.js';

const router = Router();

router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/group', groupRoutes);
router.use('/uploads', fileRoutes);
router.use('/search', searchRoutes);

export default router;
