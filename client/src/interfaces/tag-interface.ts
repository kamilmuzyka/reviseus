/** @module Interface/Tag */
import Post from './post-interface';

interface Tag {
    id: string;
    name: string;
    posts: Post[];
}

export default Tag;
