/** @module Interface/Answer */

interface Answer {
    id: string;
    content: string;
    userId: string;
    postId: string;
    createdAt: string;
    updatedAt: string;
    user: {
        id: string;
        firstName: string;
        lastName: string;
        profilePhoto: string;
    };
}

export default Answer;
