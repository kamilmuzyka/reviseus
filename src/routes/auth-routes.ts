/** @module Routes/AuthRoutes */
import { Router } from 'express';
import passport from 'passport';
import { createToken, removeToken, protect } from '../lib/auth.js';
import { getCurrentUser } from '../controllers/user-controllers.js';

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
        // @ts-expect-error The req.user object is temporarily appended by
        // Passport.js. The function below replaces it with a new req.user
        // defined in @types/express/index.d.ts, which is the correct interface
        // used across the application.
        createToken('google', req.user.id, res);
        res.redirect('/');
    }
);

router.get('/logout', (req, res) => {
    removeToken('google', res);
    res.sendStatus(200);
});

router.get('/identity', protect, getCurrentUser);

export default router;
