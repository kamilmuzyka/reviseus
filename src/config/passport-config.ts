/** @module Config/Passport */
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';

dotenv.config();

/** Create Passport.js authentication strategies. */
const initializePassport = (): void => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT || '',
                clientSecret: process.env.GOOGLE_SECRET || '',
                callbackURL: '/auth/google/redirect',
            },
            (accessToken, refreshToken, profile, done) => {
                // Look up or create a user
                done(null, profile);
            }
        )
    );
};

export default initializePassport;
