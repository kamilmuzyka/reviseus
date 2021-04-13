/** @module Routes/AuthRoutes */
import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get(
    '/google',
    passport.authenticate('google', {
        session: false,
        scope: 'profile',
    })
);

router.get(
    '/google/redirect',
    passport.authenticate('google', {
        session: false,
    }),
    (req, res) => {
        // Create JWT
        // Create cookie
        res.redirect('/');
    }
);

export default router;
