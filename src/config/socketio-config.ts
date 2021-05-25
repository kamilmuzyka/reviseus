/** @module Config/SocketIO */
import { io } from '../app.js';

/** Connects with Socket IO clients and listens for emitted messages. */
const initializeSocketIO = (): void => {
    io.on('connection', (client) => {
        /** Subscribe to a particular post and start receiving data related to
         * it in real-time. */
        client.on('subscribePost', (postId) => {
            client.join(postId);
        });

        /** Unsubscribe from a particular post and stop receiving any data
         * related to it. */
        client.on('unsubscribePost', (postId) => {
            client.leave(postId);
        });

        /** Inform all clients subscribed to a particular post about a new
         * answer. */
        client.on('postAnswer', (details) => {
            io.to(details.postId).emit('postAnswer', details);
        });

        /** Subscribe to a particular group or the public group if no group ID
         * provided. */
        client.on('subscribeGroup', (groupId) => {
            client.join(groupId ?? 'public');
        });

        /** Unsubscribe from a particular group or the public group if no group
         * ID provided. */
        client.on('unsubscribeGroup', (groupId) => {
            client.leave(groupId ?? 'public');
        });

        /** Inform all clients subscribed to a particular group about a new
         * post. */
        client.on('groupPost', (details) => {
            io.to(details.groupId ?? 'public').emit('groupPost', details);
        });
    });
};

export default initializeSocketIO;
