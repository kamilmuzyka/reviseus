/** @module Routes/GroupRoutes */
import { Router } from 'express';
import { protect } from '../lib/auth.js';
import {
    createNewGroup,
    joinGroup,
    leaveGroup,
    sendPublicGroupPosts,
    sendPrivateGroupPosts,
    sendGroupDetails,
} from '../controllers/group-controllers.js';

const router = Router();

router.post('/', protect, createNewGroup);
router.put('/join', protect, joinGroup);
router.put('/leave', protect, leaveGroup);
router.get('/public/:id/posts', sendPublicGroupPosts);
router.get('/private/:id/posts', protect, sendPrivateGroupPosts);
router.get('/:id', sendGroupDetails);

export default router;
