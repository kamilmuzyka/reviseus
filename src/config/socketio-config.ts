/** @module Config/SocketIO */
import { io } from '../app.js';

/** Connects with Socket IO clients and listens for emitted messages. */
const initializeSocketIO = (): void => {
    io.on('connection', (client) => {
        client.on('answer', (details) => {
            io.sockets.emit('answer', details);
        });
    });
};

export default initializeSocketIO;
