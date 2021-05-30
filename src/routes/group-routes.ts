/** @module Routes/GroupRoutes */
import { Router } from 'express';
import { protect } from '../lib/auth.js';
import {
    createNewGroup,
    joinGroup,
    leaveGroup,
    sendGroupPosts,
    sendGlobalPosts,
    sendGroupDetails,
} from '../controllers/group-controllers.js';

const router = Router();

router.post('/', protect, createNewGroup);
router.put('/join', protect, joinGroup);
router.put('/leave', protect, leaveGroup);
router.get('/global/posts', sendGlobalPosts);
router.get('/:id/posts', protect, sendGroupPosts);
router.get('/:id', sendGroupDetails);

export default router;
