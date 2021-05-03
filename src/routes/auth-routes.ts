/** @module Routes/AuthRoutes */
import { Router } from 'express';
import passport from 'passport';
import { createToken } from '../lib/auth.js';

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
        // @ts-expect-error *Angry TypeScript noises
        createToken('google', req.user.id, res);
        res.redirect('/');
    }
);

export default router;
