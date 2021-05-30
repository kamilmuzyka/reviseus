/** @module Routes/GroupRoutes */
import { Router } from 'express';
import { protect } from '../lib/auth.js';
import {
    createNewGroup,
    sendGroupPosts,
} from '../controllers/group-controllers.js';

const router = Router();

router.post('/', protect, createNewGroup);
router.get('/:id/posts', sendGroupPosts);

export default router;
