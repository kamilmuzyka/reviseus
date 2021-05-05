/** @module Model/Post */
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
class Post extends Model<Post> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @Column({
        type: DataType.STRING(510),
        allowNull: false,
    })
    content: string;
}

export default Post;
