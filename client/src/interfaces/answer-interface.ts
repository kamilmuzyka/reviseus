/** @module Interface/Answer */
import User from './user-interface';

interface Answer {
    id: string;
    content: string;
    userId: string;
    postId: string;
    createdAt: string;
    updatedAt: string;
    user: User;
}

export default Answer;
