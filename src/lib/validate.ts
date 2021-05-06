/** @module Lib/Validate */
import { PostAttributes } from '../models/post-model.js';

/** Validates attributes required to create a new <i>Post</i> instance. */
export const validateNewPost = (post: PostAttributes): PostAttributes => {
    const { title, content } = post;
    if (!title) {
        throw Error('Your post needs a title!');
    }
    if (!content) {
        throw Error('Please describe your work in a few words.');
    }
    return post;
};
