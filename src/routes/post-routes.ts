/** @module Routes/PostRoutes */
import { Router } from 'express';
import { protect } from '../lib/auth.js';
import {
    createNewPost,
    sendSinglePost,
} from '../controllers/post-controllers.js';

const router = Router();

router.post('/', protect, createNewPost);
router.get('/:id', sendSinglePost);

export default router;
