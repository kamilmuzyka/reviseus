interface NewPost {
    title: string;
    content: string;
    tags?: string[];
}

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
