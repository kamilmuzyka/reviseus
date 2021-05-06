/** @module Model/PostTags */
import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import Post from './post-model.js';
import Tag from './tag-model.js';

export interface PostTagsAttributes {
    postId: string;
    tagId: string;
}

@Table({
    timestamps: false,
})
class PostTags extends Model<PostTagsAttributes> {
    @ForeignKey(() => Post)
    @Column
    postId: string;

    @ForeignKey(() => Tag)
    @Column
    tagId: string;
}

export default PostTags;
