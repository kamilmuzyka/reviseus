/** @module Routes/PostRoutes */
import { Router } from 'express';
import { protect } from '../lib/auth.js';
import {
    createNewPost,
    createPostAnswer,
    sendSinglePost,
    sendPublicPosts,
    sendPostAnswers,
} from '../controllers/post-controllers.js';

const router = Router();

router.post('/', protect, createNewPost);
router.post('/answer', protect, createPostAnswer);
router.get('/public', sendPublicPosts);
router.get('/:id', sendSinglePost);
router.get('/:id/answers', sendPostAnswers);

export default router;
