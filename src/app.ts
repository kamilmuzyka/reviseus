import path from 'path';
import express from 'express';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth-routes.js';
import apiRoutes from './routes/api-routes.js';
import sequelize from './config/sequelize-config.js';
import initializePassport from './config/passport-config.js';
import initializeSocketIO from './config/socketio-config.js';

/** Define local constants. */
const PORT = process.env.PORT ?? 8080;
const DIRNAME = process.env.PWD ?? '';

/** Create Express application. */
const app = express();

/** Set up middleware. */
app.use(express.json());
app.use(cookieParser());

/** Install routes. */
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

/** Serve static files. */
app.use(express.static(path.join(DIRNAME, 'client', 'dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(DIRNAME, 'client', 'dist', 'index.html'));
});

/** Start an HTTP server. */
const httpServer = app.listen(PORT, async () => {
    await sequelize.sync({
        // force: true,
        // ^ Uncomment to recreate the database. Use in development only.
    });
    initializePassport();
    console.log(`Server running at port ${PORT}`);
});

/** Start a WebSocket server. */
export const io = new Server(httpServer);
initializeSocketIO();
