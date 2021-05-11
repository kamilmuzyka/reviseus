/** @module Routes/PostRoutes */
import { Router } from 'express';
import { protect } from '../lib/auth.js';
import {
    createNewPost,
    createPostAnswer,
    sendSinglePost,
} from '../controllers/post-controllers.js';

const router = Router();

router.post('/', protect, createNewPost);
router.post('/answer', protect, createPostAnswer);
router.get('/:id', sendSinglePost);

export default router;
