/** @module Model/File */
import { Optional } from 'sequelize';
import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import Post, { PostAttributes } from './post-model.js';

export interface FileAttributes {
    id: string;
    uri: string;
    postId?: string;
    post?: PostAttributes;
}

interface FileCreationAttributes extends Optional<FileAttributes, 'id'> {}

@Table({
    timestamps: false,
})
class File extends Model<FileAttributes, FileCreationAttributes> {
    @Column({
        type: DataType.STRING,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    uri: string;

    @ForeignKey(() => Post)
    postId: string;

    @BelongsTo(() => Post)
    post: PostAttributes;
}

export default File;
