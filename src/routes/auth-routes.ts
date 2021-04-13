/** @module Routes/AuthRoutes */
import { Router } from 'express';

const router = Router();

router.get('/auth/google', (req, res) => {
    res.send('Logging with Google');
});

router.get('/auth/google/redirect', (req, res) => {
    res.redirect('/');
});

export default router;
