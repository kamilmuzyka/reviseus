import path from 'path';
import express from 'express';
import initializePassport from './config/passport-config.js';
import authRoutes from './routes/auth-routes.js';

/** Define local constants. */
const PORT = process.env.PORT || 8080;
const DIRNAME = process.env.PWD || '';

/** Create Express application. */
const app = express();

/** Set up middleware. */
app.use(express.json());

/** Install routes. */
app.use('/auth', authRoutes);

/** Serve static files. */
app.use(express.static(path.join(DIRNAME, 'client', 'dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(DIRNAME, 'client', 'dist', 'index.html'));
});

/** Start the application. */
app.listen(PORT, () => {
    initializePassport();
    console.log(`Server running at port ${PORT}`);
});
