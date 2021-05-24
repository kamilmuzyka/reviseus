/** @module Routes/GroupRoutes */
import { Router } from 'express';
import { sendGroupPosts } from '../controllers/group-controllers.js';

const router = Router();

router.get('/:id/posts', sendGroupPosts);

export default router;
