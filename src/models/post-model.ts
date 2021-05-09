/** @module Model/Post */
import { Optional } from 'sequelize';
import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
    BelongsToMany,
    HasMany,
} from 'sequelize-typescript';
import User, { UserAttributes } from './user-model.js';
import Group, { GroupAttributes } from './group-model.js';
import Tag from './tag-model.js';
import PostTags from './post-tags-model.js';
import File from './file-model.js';
import Answer from './answer-model.js';

export interface PostAttributes {
    id: string;
    title: string;
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
    userId?: string;
    groupId?: string;
    user?: UserAttributes;
    tags?: Tag[];
    files?: File[];
    answers?: Answer[];
}

interface PostCreationAttributes extends Optional<PostAttributes, 'id'> {}

@Table
class Post extends Model<PostAttributes, PostCreationAttributes> {
    @Column({
        type: DataType.STRING,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    content: string;

    @ForeignKey(() => User)
    @Column
    userId: string;

    @ForeignKey(() => Group)
    @Column
    groupId: string;

    @BelongsTo(() => User)
    user: UserAttributes;

    @BelongsTo(() => Group)
    group: GroupAttributes;

    @BelongsToMany(() => Tag, () => PostTags)
    tags: Tag[];

    @HasMany(() => File)
    files: File[];

    @HasMany(() => Answer)
    answers: Answer[];
}

export default Post;
