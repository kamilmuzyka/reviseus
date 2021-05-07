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
    if (!content) {
        throw Error('Please describe your work in a few words.');
    }
    return post;
};
