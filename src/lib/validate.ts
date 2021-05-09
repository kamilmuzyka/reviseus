/** @module Lib/Validate */

interface NewPost {
    title: string;
    content: string;
    tags?: string;
    groupId?: string;
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
