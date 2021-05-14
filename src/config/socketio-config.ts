import { io } from '../app.js';

const initializeSocketIO = (): void => {
    io.on('connection', (client) => {
        console.log(client.id);
    });
};

export default initializeSocketIO;
