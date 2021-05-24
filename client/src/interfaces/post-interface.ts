/** @module Interface/Post */
import User from './user-interface';
import Answer from './answer-interface';

interface Post {
    id: string;
    title: string;
    content: string;
    userId: string;
    groupId: string;
    user: User;
    answers: Answer[];
    createdAt: string;
    updatedAt: string;
}

export default Post;
