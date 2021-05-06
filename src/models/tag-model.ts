/** @module Model/Tag */
import { Optional } from 'sequelize';
import {
    Table,
    Column,
    Model,
    DataType,
    BelongsToMany,
} from 'sequelize-typescript';
import Post from './post-model.js';
import PostTags from './post-tags-model.js';

export interface TagAttributes {
    id: string;
    name: string;
}

interface TagCreationAttributes extends Optional<TagAttributes, 'id'> {}

@Table({
    timestamps: false,
})
class Tag extends Model<TagAttributes, TagCreationAttributes> {
    @Column({
        type: DataType.STRING,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @Column({
        type: DataType.STRING(35),
        allowNull: false,
    })
    name: string;

    @BelongsToMany(() => Post, () => PostTags)
    posts: Post[];
}

export default Tag;
