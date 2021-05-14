/** @module Context/SocketIO */
import { io, Socket } from 'socket.io-client';

/** Creates and stores a Socket IO client. */
class Client {
    private socket;

    constructor() {
        this.initialize();
    }

    initialize(): void {
        this.socket = io();
    }

    get io(): Socket {
        return this.socket;
    }
}

export default Object.freeze(new Client());
