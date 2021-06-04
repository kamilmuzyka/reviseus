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

interface NewGroup {
    name: string;
    type: string;
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

/** Validates attributes required to create a new <i>Group</i> instance. */
export const validateNewGroup = (group: NewGroup): NewGroup => {
    const { name, type } = group;
    if (!name) {
        throw Error('Your group needs a name!');
    }
    if (name.trim().length < 3) {
        throw Error('Group name should be at least 3 characters long.');
    }
    if (name.trim().length > 255) {
        throw Error('Group name should be at most 255 characters long.');
    }
    if (!type) {
        throw Error('No group type provided.');
    }
    if (type !== 'public' && type !== 'private') {
        throw Error('Incorrect group type provided.');
    }
    return group;
};
