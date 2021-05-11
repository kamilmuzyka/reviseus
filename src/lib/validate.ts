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
    if (title.length < 10) {
        throw Error('Your post title should be at least 10 characters long.');
    }
    if (title.length > 255) {
        throw Error('Your post title should be at most 255 characters long.');
    }
    if (!content) {
        throw Error('Please describe your problem in a few words.');
    }
    if (content.length > 50000) {
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
    if (!content) {
        throw Error('No answer provided.');
    }
    if (content.length > 50000) {
        throw Error('Your answer is too long!');
    }
    return answer;
};
