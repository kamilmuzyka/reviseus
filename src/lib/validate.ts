/** @module Lib/Validate */

interface NewPost {
    title: string;
    content: string;
    tags?: string;
    groupId?: string;
}

interface PostAnswer {
    postId: string;
    content: string;
}

/** Validates attributes required to create a new <i>Post</i> instance. */
export const validateNewPost = (post: NewPost): NewPost => {
    const { title, content } = post;
    if (!title) {
        throw Error('Your post needs a title!');
    }
    if (title.trim().length < 10) {
        throw Error('Your post title should be at least 10 characters long.');
    }
    if (title.trim().length > 255) {
        throw Error('Your post title should be at most 255 characters long.');
    }
    if (!content.trim().length) {
        throw Error('Please describe your problem in a few words.');
    }
    if (content.trim().length > 50000) {
        throw Error('Your post is too long!');
    }
    return post;
};

/** Validates attributes required to create a new <i>Answer</i> instance. */
export const validatePostAnswer = (answer: PostAnswer): PostAnswer => {
    const { postId, content } = answer;
    if (!postId) {
        throw Error('No post ID provided.');
    }
    if (!content.trim().length) {
        throw Error('Please type in your answer.');
    }
    if (content.trim().length > 50000) {
        throw Error('Your answer is too long!');
    }
    return answer;
};
