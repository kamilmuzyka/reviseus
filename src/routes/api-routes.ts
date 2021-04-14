/** @module Routes/APIRoutes */
import { Router } from 'express';
import { protect } from '../lib/auth.js';

const router = Router();

router.get('/', protect, (req, res) => {
    res.json(req.user);
});

export default router;
