/** @module Config/Passport */
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

/** Create Passport.js authentication strategies. */
const initializePassport = (): void => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT ?? '',
                clientSecret: process.env.GOOGLE_SECRET ?? '',
                callbackURL: '/auth/google/redirect',
            },
            async (accessToken, refreshToken, profile, done) => {
                const user = await User.findOrCreate({
                    where: {
                        firstName: profile.name?.givenName,
                        lastName: profile.name?.familyName,
                        googleId: profile.id,
                    },
                });
                done(null, user);
            }
        )
    );
};

export default initializePassport;
