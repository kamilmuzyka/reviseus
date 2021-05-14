import { io, Socket } from 'socket.io-client';

class Client {
    private socket;

    constructor() {
        this.initialize();
    }

    initialize(): void {
        if (!this.socket) {
            this.socket = io();
        }
    }

    get io(): Socket {
        return this.socket;
    }
}

export default Object.freeze(new Client());
